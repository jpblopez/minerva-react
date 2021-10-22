const style = {
  width: '120px',
};

const Widget = ({ styling, title, text, ...props }) => {
  const className = `rounded-lg p-4 text-center ${styling}`;

  return (
    <div {...props} style={style} className={className}>
      <div className="text-3xl mb-2 font-bold">{text}</div>
      <div>{title}</div>
    </div>
  );
};

export default Widget;
