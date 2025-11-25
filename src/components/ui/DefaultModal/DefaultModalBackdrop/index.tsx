import { PropsWithChildren } from 'react';

type Props = {
  justifyContent?: 'flex-end' | 'center';
};

const DefaultModalBackdrop = ({
  children,
  justifyContent = 'center',
}: PropsWithChildren<Props>) => {
  return (
    <div
      className="absolute inset-0 flex items-center bg-black/25"
      style={{ justifyContent }}
    >
      {children}
    </div>
  );
};

export default DefaultModalBackdrop;
