type Props = {
  text: string;
};

const EmptyComponent = ({ text }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <h4 className="text-neutral-60">{text}</h4>
    </div>
  );
};

export default EmptyComponent;
