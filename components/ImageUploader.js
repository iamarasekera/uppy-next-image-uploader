import React from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const ImageUploader = () => {
  const uppy = React.useMemo(() => new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 10, allowedFileTypes: ['image/*'] },
    autoProceed: false,
  }), []);

  React.useEffect(() => {
    uppy.use(AwsS3, {
      companionUrl: '/api/s3-upload',
    });

    uppy.on('complete', (result) => {
      console.log('Upload complete! We hve uploaded these files:', result.successful);
    });

    return () => uppy.close();
  }, [uppy]);

  return (
    <Dashboard
      uppy={uppy}
      plugins={['Webcam']}
    />
  );
};

export default ImageUploader;