import React from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const ImageUploader = () => {
  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 10, allowedFileTypes: ['image/*'] },
    autoProceed: false,
  });

  uppy.use(AwsS3, {
    companionUrl: '/api/s3-upload', // We'll create this endpoint
  });

  uppy.on('complete', (result) => {
    console.log('Upload complete! We hve uploaded these files:', result.successful);
  });

  return (
    <Dashboard
      uppy={uppy}
      plugins={['Webcam']}
    />
  );
};

export default ImageUploader;