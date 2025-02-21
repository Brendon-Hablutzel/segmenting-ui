'use client';

import initializeJob from '@/app/actions/initialize-job';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import CircleXIcon from '@/svg/CircleXIcon';
import Image from 'next/image';
import { useActionState, useState } from 'react';

const AddJob = () => {
  const [jobName, setJobName] = useState('');
  const [module, setModule] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // const [jobInitError, setJobInitError] = useState<string | null>(null);
  // const [jobInitLoading, setJobInitLoading] = useState(false);

  const [state, action, pending] = useActionState(initializeJob, undefined);

  console.log(state);

  // const handleJobSubmit = async (e: React.FormEvent) => {
  //   setJobInitError(null);

  //   e.preventDefault();

  //   const startInitLoading = setTimeout(() => {
  //     setJobInitLoading(true);
  //   }, 500);

  //   try {
  //     if (!auth?.IdToken) {
  //       throw new Error('missing auth id token');
  //     }

  //     if (!image) {
  //       throw new Error('missing image');
  //     }
  //     console.log(image);

  //     const blob = new Blob([image], { type: image.type });

  //     const res = await initializeJob(auth?.IdToken, module, blob);
  //     clearTimeout(startInitLoading);
  //     setJobInitLoading(false);
  //     console.log(res);
  //   } catch (e) {
  //     clearTimeout(startInitLoading);
  //     setJobInitLoading(false);
  //     // TODO: handle other specific errors
  //     console.error(e);
  //   }
  // };

  return (
    <div className="text-text-light">
      <div className="h-fit bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
        <form className="flex flex-col gap-4 h-full" action={action}>
          <div className="text-3xl">Add Job</div>
          <div className="grid grid-cols-[3fr_2fr] gap-4 h-full">
            {image ? (
              <div className="h-auto w-full max-h-[80vh] overflow-hidden relative flex justify-center items-center bg-bg-card border-[1px] border-text-light/10 rounded-xl">
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
                  src={URL.createObjectURL(image)}
                  quality={100}
                  height={1000}
                  width={1000}
                  className="w-full h-auto"
                  priority
                />
              </div>
            ) : null}
            <div
              className={`${image ? 'hidden' : ''} flex justify-center items-center bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4`}
            >
              <label className="hover:cursor-pointer p-2 text-text-light/50 select-none">
                Click here to upload an image
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  name="image"
                />
              </label>
            </div>
            <div className="flex flex-col px-6 gap-5">
              <div className="text-lg">
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
              <Button
                kind="primary"
                text="Initialize Job"
                type="submit"
                disabled={
                  jobName.length === 0 || module.length === 0 || image === null
                }
                isLoading={pending}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
