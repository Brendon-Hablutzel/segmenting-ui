const Modules = () => {
  return (
    <div className="text-text-light">
      <div className="flex flex-col gap-4 h-fit bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
        <div className="text-3xl">Modules</div>
        <div className="flex flex-col gap-1 text-xl">
          <div className="font-bold">Segmenter</div>
          <div>
            Performs segmentation on the input image--i.e., attempts to identify
            objects and generate bounding boxes for those objects
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;
