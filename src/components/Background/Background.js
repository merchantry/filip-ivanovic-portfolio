import './Background.css';
import { ReactComponent as Blob1 } from '../../img/blob_1.svg';
import { ReactComponent as Blob2 } from '../../img/blob_2.svg';

function Background() {
  return (
    <div className="Background">
      <Blob1 className="Blob1 Blob" />
      {/* <Blob2 className="Blob2 Blob" /> */}
    </div>
  );
}

export default Background;
