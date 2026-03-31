import SeatChart from './SeatChart';

const testData = [
  { name: 'Hans Müller', Bezirk: 'Appenzell', row: 0, col: 0 },
  { name: 'Lisa Meier', Bezirk: 'Schwende-Rüte', row: 0, col: 1 },
  { name: 'Peter Egger', Bezirk: 'Gonten', row: 1, col: 0 },
  { name: 'Julia Weber', Bezirk: 'Oberegg', row: 1, col: 1 },
];

function App() {
  return (
    <div>
      <h1>Grosser Rat Visualisierung</h1>
      <SeatChart data={testData} />
    </div>
  );
}

export default App;
