import Bevoelkerung from '../components/Bevoelkerung';
import BevoelkerungViz from '../visualizations/BevoelkerungViz';
import rawData from '../data/KTAI_01_100.csv';
import { prepareBevoelkerungData } from '../data/BevoelkerungData';

const BevoelkerungPage = () => {
  const data = prepareBevoelkerungData(rawData);

  return (
    <>
      <Bevoelkerung />
      <BevoelkerungViz data={data} />
    </>
  );
};

export default BevoelkerungPage;
