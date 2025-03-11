'use client';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { useAuthContext } from '@/hooks/useAuthContext';
import CircleXIcon from '@/svg/CircleXIcon';
import { getAdjustedSize } from '@/utils';
import { startJob } from '@/utils/backend';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddJob = () => {
  const router = useRouter();

  const { auth } = useAuthContext();

  if (!auth) {
    throw new Error('auth must be defined');
  }

  const [jobName, setJobName] = useState('');
  const [module, setModule] = useState('');
  const [image, setImage] = useState<{ url: string; file: File } | null>(null);
  const [imageDims, setImageDims] = useState({
    height: 1000,
    width: 1000,
  });

  const [submissionStatus, setSubmissionStatus] = useState<
    | {
        status: 'none';
      }
    | {
        status: 'loading';
      }
    | {
        status: 'error';
        error: string;
      }
  >({
    status: 'none',
  });

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const ev = e.currentTarget.files;
    if (ev) {
      if (ev.length === 0) {
        return;
      }
      const img: HTMLImageElement = document.createElement('img');
      const imgUrl = URL.createObjectURL(ev[0]);

      img.onload = function () {
        const newDims = getAdjustedSize({
          width: img.width,
          height: img.height,
        });

        setImageDims(newDims);
        setImage({ url: imgUrl, file: ev[0] });
      };

      img.src = imgUrl;
    }
  };

  const handleAddJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus({
      status: 'loading',
    });

    if (!image) {
      setSubmissionStatus({
        status: 'error',
        error: 'Missing image',
      });
      return;
    }

    try {
      const blob = new Blob([image.file], { type: image.file.type });

      const res = await startJob(auth.idToken, module, jobName, blob);

      if (!res.success) {
        throw new Error(res.error);
      }

      setSubmissionStatus({
        status: 'none',
      });
      router.push('/jobs');
    } catch (e) {
      console.error(e);
      setSubmissionStatus({
        status: 'error',
        error: 'Error starting job',
      });
    }
  };

  // TODO: pressing enter once all the fields are filled out and an image has been uploaded
  // causes the image to disappear
  return (
    <div className="text-text-light">
      <div className="h-fit bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
        <form
          className="flex flex-col gap-4 h-full"
          onSubmit={handleAddJobSubmit}
        >
          <div className="text-3xl">Add Job</div>
          <div className="grid lg:grid-cols-[3fr_2fr] gap-4 h-full">
            {image ? (
              <div className="flex justify-center">
                <div className="h-auto w-fit overflow-hidden relative flex justify-center items-center bg-bg-card border-[1px] border-text-light/10 rounded-xl">
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => setImage(null)}
                  >
                    <CircleXIcon
                      strokeWidth="3"
                      svgClassName="w-8 h-8 bg-[#1B251B]/50 rounded-full p-1"
                      pathClassName="stroke-text-light"
                    />
                  </button>
                  <Image
                    alt="not found"
                    src={image.url}
                    quality={100}
                    height={imageDims.height}
                    width={imageDims.width}
                  />
                </div>
              </div>
            ) : null}
            <div
              className={`${image ? 'hidden' : ''} h-[25vh] lg:h-auto w-full flex justify-center items-center bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4`}
            >
              <label className="hover:cursor-pointer p-2 text-text-light/50 select-none text-center">
                Click here to upload an image
                <input
                  className="hidden"
                  type="file"
                  onChange={handleImageUpload}
                  name="image"
                />
              </label>
            </div>
            <div className="flex flex-col px-6 gap-5">
              <div className="text-lg text-center lg:text-left">
                Upload an image and enter configuration details
              </div>
              <TextInput
                state={jobName}
                setState={setJobName}
                type="text"
                placeholder="Job name"
                name="name"
              />
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className={`bg-inherit border-white/20 border-[1px] rounded-3xl py-2 px-3 w-full text-xl ${module === '' ? 'text-text-light/50' : 'text-text-light'}`}
                name="module"
              >
                <option value="" disabled className="text-text-light/50">
                  Select a module
                </option>
                <option value="segmenter">Segmenter</option>
              </select>
              {submissionStatus.status === 'error' ? (
                <div className="text-red-600 text-center">
                  {submissionStatus.error}
                </div>
              ) : null}
              <Button
                kind="primary"
                text="Start Job"
                type="submit"
                disabled={
                  jobName.length === 0 || module.length === 0 || image === null
                }
                isLoading={submissionStatus.status === 'loading'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
