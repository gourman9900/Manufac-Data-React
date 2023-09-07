const th1 = (data:any): any => {
    return Object.keys(data).map((key) => {
      return <th key={key}>Class {key}</th>;
    });
  };
  const td1 = (data: any): any => {
    return Object.values(data).map((value: any) => {
      return <td>{value}</td>;
    });
  };
export default function Stat(props:any) {                 //Helper component for the table structure
  return (
    <>
      <table className="fl">
        <thead>
          <tr>
            <th>Measure</th>
            {th1(props.data[0])}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.title} Mean</td>
            {td1(props.data[0])}
          </tr>
          <tr>
            <td>{props.title} Median</td>
            {td1(props.data[2])}
          </tr>
          <tr>
            <td>{props.title} Mode</td>
            {td1(props.data[1])}
          </tr>
        </tbody>
      </table>
    </>
  );
}
