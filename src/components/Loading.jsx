import { AiOutlineLoading3Quarters as Icon } from 'react-icons/ai';

const Loading = ({ styling = '', size = 50 }) => {
  const className = `flex flex-flow justify-center items-center ${styling}`;

  return (
    <div className={className}>
      <Icon className="animate-spin" size={size} />
    </div>
  );
};
export default Loading;
