import cloudinary from '../config/cloudinary.js';

async function attachCloudinaryResponse(req, res, next) {
  try {
    if (req.file) {
      const publicId =
        req.file.filename ||
        (() => {
          try {
            return req.file.path.split('/').slice(-2).join('/').split('.')[0];
          } catch (e) {
            return undefined;
          }
        })();

      if (publicId) {
        try {
          const info = await cloudinary.api.resource(publicId);
          req.file.cloudinary = info;
        } catch (err) {
          // Non-fatal; log and continue
          console.warn(
            'Could not fetch Cloudinary resource for',
            publicId,
            err?.message || err
          );
        }
      }
    }

    if (req.files && Array.isArray(req.files)) {
      await Promise.all(
        req.files.map(async (file) => {
          const publicId =
            file.filename ||
            (() => {
              try {
                return file.path.split('/').slice(-2).join('/').split('.')[0];
              } catch (e) {
                return undefined;
              }
            })();

          if (publicId) {
            try {
              const info = await cloudinary.api.resource(publicId);
              file.cloudinary = info;
            } catch (err) {
              console.warn(
                'Could not fetch Cloudinary resource for',
                publicId,
                err?.message || err
              );
            }
          }
        })
      );
    }

    return next();
  } catch (err) {
    console.error('attachCloudinaryResponse error:', err);
    return next();
  }
}

export default attachCloudinaryResponse;
