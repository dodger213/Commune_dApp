/* This component has been copy pasted from the Docasaurus version of the project */

const cubes = [{ src: "/gif/cubes/black_small.gif" }];

const CubeComponent = () => (
  <div className="flex justify-center p-4 mt-5">
    {cubes.map((cube, index) => (
      <div key={index} className="flex flex-col items-center justify-center font-sans font-semibold text-lg">
        <img src={cube.src} className="w-[150px] h-[150px] duration-300" />
      </div>
    ))}
  </div>
);

export default CubeComponent;
