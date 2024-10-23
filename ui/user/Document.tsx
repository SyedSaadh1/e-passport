/* eslint-disable @next/next/no-img-element */
import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, Dialog, DialogPanel, Icon, Text } from '@tremor/react';
import { RiCloseFill } from '@remixicon/react';
import { approveDocuments } from '../../server/actions/admin/document.actions';
import { USER_STATUS } from '../../constants/user';
import { IUserProfileDocument } from './UserProfileContainer';
import { useRouter } from 'next/navigation';

interface IFileName {
  [key: string]: string;
}

const FILE_NAME: IFileName = {
  passport: 'Passport',
  visa: 'Visa',
  emiratesIdFront: 'Emirates ID Front',
  emiratesIdBack: 'Emirates ID Back',
  proofOfMobile: 'Proof Of Mobile',
  selfiePhoto: 'Selfie Photo',
  selfieVideo: 'Selfie Video',
};

interface DocumentProps extends IUserProfileDocument {
  video?: boolean;
  isAdmin?: boolean;
}

const Document: React.FC<DocumentProps> = ({ fileType, imageUrl, id, path, extension, video, isAdmin, status: fileStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(true);

  const onOpen = useCallback(() => setIsOpen(true), []);

  const router = useRouter();

  useEffect(() => {
    if (status) {
      router.refresh();
    }
  }, [status, router])

  const onActionClick = async (action: string) => {
    setIsLoading(true);
    setStatus(false);
    await approveDocuments([{ fileType, imageUrl, id, path, extension }], action);
    setIsLoading(false);
    setStatus(true);

  }

  const mediaClassName = "w-full h-full object-contain transition duration-500 group-hover:scale-125 group-hover:opacity-[0.20] group-hover:-rotate-12";
  const component = video ? (
    <video src={imageUrl} controls className={mediaClassName} />
  ) : (
    <img src={imageUrl} alt={FILE_NAME[fileType] || 'Document'} className={mediaClassName} />
  );

  let headerClass = `bg-slate-200`;
  let badgeColor = '';
  
  if (fileStatus === USER_STATUS.APPROVED) {
    headerClass = `bg-green-800 text-white`;
    badgeColor = 'green';
  }

  if (fileStatus === USER_STATUS.REJECTED) {
    headerClass = `bg-red-800 text-white`;
    badgeColor = 'red';
  }

  

  return (
    <Card className="group w-full p-0 overflow-hidden flex flex-col relative duration-500 transition bg-slate-50 hover:bg-slate-900">
      <Text className={`${headerClass} p-4 flex justify-between font-bold border-b-2 border-white relative z-10`}>
        <span>{FILE_NAME[fileType]}</span>  {fileStatus && <Badge size="xs" color={badgeColor}>{fileStatus}</Badge>}
      </Text>
      <div className='relative max-h-96 h-full'>
        {component}
        <div className='absolute w-full h-full top-0 left-0 z-10 cursor-pointer' onClick={onOpen} />
        {isAdmin && (
          <div className="absolute w-full bottom-0 left-0 z-20 p-4 flex justify-center gap-4 translate-y-[100%] duration-500 transition-transform group-hover:translate-y-[0]">
            <Button disabled={fileStatus === USER_STATUS.REJECTED} loading={isLoading} onClick={() => onActionClick(USER_STATUS.REJECTED)} color="red" name="REJECT">Reject</Button>
            <Button disabled={fileStatus === USER_STATUS.APPROVED} loading={isLoading} onClick={() => onActionClick(USER_STATUS.APPROVED)} color="green" name="APPROVED">Approve</Button>
          </div>
        )}
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="relative max-w-screen-xl">
          <Icon onClick={() => setIsOpen(false)} icon={RiCloseFill} variant="outlined" tooltip="close" size="md" className="cursor-pointer absolute top-3 right-3" />
          {component}
        </DialogPanel>
      </Dialog>
    </Card>
  );
};

export default Document;
