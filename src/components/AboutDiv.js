const AboutDiv = ({ title, bookInfo, iterable }) => {
  return !iterable ? (
    <div className="info">
      <span className="title">{title}</span>
      <span className="data">{bookInfo}</span>
    </div>
  ) : (
    <div className="info">
      <span className="title">{title}</span>
      <span className="data">
        {bookInfo !== undefined ? (
          bookInfo.map((prop, index) => (
            <span key={index}>
              {index < bookInfo.length - 1 ? `${prop}, ` : prop}
            </span>
          ))
        ) : (
          <span></span>
        )}
      </span>
    </div>
  );
};

export default AboutDiv;
