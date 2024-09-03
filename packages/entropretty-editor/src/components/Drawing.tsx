import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { offscreenWorker } from "../App";

interface Props {
  seed: Uint8Array;
  script: string;
  size: number;
}

export const Drawing: React.FC<Props> = ({ seed, script, size }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    offscreenWorker.draw(script, seed, size).then((url) => {
      console.log({ url });
      setImageUrl(url);
    });
  }, [seed, script, size]);

  if (!imageUrl) return <Skeleton style={{ width: size, height: size }} />;

  return <img src={imageUrl} />;
};
