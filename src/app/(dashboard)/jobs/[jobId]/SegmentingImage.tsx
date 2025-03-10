import { getAdjustedSize } from '@/utils';
import { blurhashToBase64 } from 'blurhash-base64';
import Image from 'next/image';

const SegmentingImage = ({
  url,
  blurHash,
  options: { height, width },
}: {
  url: string;
  blurHash?: string;
  options: {
    height?: number;
    width?: number;
  };
}) => {
  const { height: adjustedHeight, width: adjustedWidth } = getAdjustedSize({
    height,
    width,
  });

  return (
    <Image
      alt="not found"
      src={url}
      quality={100}
      height={adjustedHeight}
      width={adjustedWidth}
      fill={false}
      placeholder={blurHash ? 'blur' : 'empty'}
      blurDataURL={blurHash ? blurhashToBase64(blurHash) : undefined}
      className="rounded-xl"
    />
  );
};

export default SegmentingImage;
