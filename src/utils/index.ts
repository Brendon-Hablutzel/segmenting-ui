export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const POOL_CLIENT_ID = process.env.NEXT_PUBLIC_POOL_CLIENT_ID;

export function assertIsDefined(
  name: string,
  value: string | undefined,
): asserts value is string {
  if (value === undefined) {
    throw new Error(`${name} is not defined`);
  }
}

export const getAdjustedSize = ({
  height,
  width,
}: {
  height?: number;
  width?: number;
}): {
  height: number;
  width: number;
} => {
  if (!height || !width) {
    return {
      height: 500,
      width: 500,
    };
  }

  if (height <= 500) {
    return { width, height };
  }

  const aspectRatio = width / height;
  const newHeight = 500;
  const newWidth = Math.round(newHeight * aspectRatio);

  return { width: newWidth, height: newHeight };
};

export const MOBILE_SIZE_CUTOFF = 768;
