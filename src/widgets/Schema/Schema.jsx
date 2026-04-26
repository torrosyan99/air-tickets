

import CarriagePlatzkart from './CarriagePlatzkart.jsx';
// import './carriageView.css';

const CarriageView = () => {

const data = {}

const type = 'third'
  return (
    <>
      {type && (
        <div className="carriage-view">
          {/*{type === 'fourth' && <CarriageSeat data={data} />}*/}
          {type === 'third' && <CarriagePlatzkart data={data} />}
          {/*{type === 'second' && (*/}
          {/*  <CarriageCompartment data={data} />*/}
          {/*)}*/}
          {/*{type === 'first' && <CarriageLux data={data} />}*/}
        </div>
      )}
    </>
  );
};

export default CarriageView;
