const NoiseBox = ({designation, companyName, workMonths, workdescription,workImgSrc}) => {
  return (
    <div className="relative group rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 flex flex-col md:flex-row items-center p-6 md:p-10 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      
      {/* Left: Description */}
      <div className="w-full md:w-1/2 space-y-3 text-left text-white">
        <h2 className="text-2xl font-bold">{designation}</h2>
        <h3 className="text-lg font-medium text-gray-300">{companyName} • {workMonths}</h3>
        <p className="text-gray-200">
          {workdescription}
        </p>
      </div>

      {/* Right: Image */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img
          src={workImgSrc}
          alt="Experience"
          className="rounded-xl w-[300px] max-w-sm shadow-lg"

        />
      </div>
    </div>
  );
};

export default NoiseBox;
