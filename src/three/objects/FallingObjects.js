import BitcoinStack from './BitcoinStack';
import GearA from './GearA';
import GearB from './GearB';
import Laptop from './Laptop';
import Mouse from './Mouse';
import User from './User';

function FallingObjects() {
  return (
    <>
      <BitcoinStack height={40} />
      <GearA height={60} />
      <User height={180} />
      <Laptop height={260} />
      <BitcoinStack height={340} />
      <Mouse height={400} />
      <GearB height={460} />
      <GearA height={580} />
      <BitcoinStack height={700} />
    </>
  );
}

export default FallingObjects;
