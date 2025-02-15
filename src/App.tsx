import { Link } from 'react-router-dom';
import Button from './components/Button';
import UploadCloudIcon from './components/UploadCloudIcon';

function App() {
  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark grid grid-rows-[2fr_2fr_3fr] py-16 px-5 gap-5">
      <div className="flex flex-col justify-end">
        <div className="flex justify-center">
          <UploadCloudIcon pathClassName="stroke-text-primary" />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8">
        <div className="flex items-center justify-center">
          <h1 className="text-text-primary text-7xl w-full text-center">
            Seg UI
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-text-primary text-xl text-center">
            A platform for generalized image segmentation
          </h1>
        </div>
      </div>
      <div className="flex justify-center p-2">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <Link to={{ pathname: '/login' }}>
              <Button text="Log In" kind="primary" />
            </Link>
          </div>
          <div className="flex justify-center">
            <Link to={{ pathname: '/signup' }}>
              <Button text="Sign Up" kind="secondary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
