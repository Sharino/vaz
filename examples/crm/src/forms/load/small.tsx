import * as yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import { withTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { NavigationContext } from '../../contexts/navigation';
import { useLocalStorage } from '../../hooks/localStorage';
import CancelIcon from '@mui/icons-material/CancelOutlined';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_SIZE = 524288;
const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const YupValidation = (t: any) =>
  yup.object().shape({
    description: yup
      .string()
      .min(3, 'Too Short !')
      .max(30, 'Too Long !')
      .required('Required !'),

    sizeL: yup.number(),

    sizeB: yup.number(),

    sizeW: yup.number(),

    weight: yup.number().required(t('form.required')),
  });

const FormField = ({ label, children }: { label: string; children: any }) => {
  return (
    <Box>
      <Box mb={1}>
        <Typography>{label}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>{children}</Box>
    </Box>
  );
};

const LoadFormComponent = (props: any) => {
  const { t } = props;
  const [step2, setStep2] = useLocalStorage('step2', '');
  const { activeStep, setActiveStep } = useContext(NavigationContext);

  const [data, setData] = useState(JSON.parse(step2 || '{}'));
  const [fileList, setFileList] = useState<Array<string>>([]);
  const [isFlammable, setIsFlammable] = useState(false);

  useEffect(() => {
    if (data.fileList) setFileList(data.fileList || []);
  }, [data]);

  useEffect(() => {
    setStep2(JSON.stringify({ ...data, fileList }));
  }, [fileList]);

  const handleSubmit = (values: any, props: any) => {
    setStep2(JSON.stringify({ ...values, fileList }));
    setActiveStep(2);
  };

  const handleFileUpload = async (event: any) => {
    // Convert the FileList into an array and iterate
    let files = Array.from(event.target.files).map(file => {
      // Define a new file reader
      let reader = new FileReader();

      // Create a new promise
      return new Promise(resolve => {
        // Resolve the promise after reading file
        reader.onloadend = () => resolve(reader.result);

        // Read the file as a text
        reader.readAsDataURL(file);
      });
    });

    // At this point you'll have an array of results
    let res = await Promise.all(files);
    setFileList([...fileList, ...(res as Array<string>)]);
  };

  const handleRemove = (index: number) => {
    setStep2(JSON.stringify({ ...data, fileList: fileList.splice(index, 1) }));
  };

  return (
    <>
      <Formik
        initialValues={{
          description: data.description || '',
          sizeL: data.sizeL || '',
          sizeB: data.sizeB || '',
          sizeW: data.sizeW || '',
          weight: data.weight || '',
        }}
        validationSchema={YupValidation(t)}
        onSubmit={handleSubmit}
      >
        {(props: any) => {
          const { description, sizeL, sizeB, sizeW, weight } = props.values;

          return (
            <Form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <TextField
                  multiline
                  rows={2}
                  label={t('form.description')}
                  name="description"
                  fullWidth
                  variant="outlined"
                  value={description}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  helperText={<ErrorMessage name="description" />}
                  error={
                    !!props.errors.description && props.touched.description
                  }
                  required
                />

                <TextField
                  label={t('form.aproximateSizeL')}
                  name="sizeL"
                  fullWidth
                  variant="outlined"
                  value={sizeL}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  helperText={<ErrorMessage name="sizeL" />}
                  error={!!props.errors.sizeL && props.touched.sizeL}
                />

                <TextField
                  label={t('form.aproximateSizeB')}
                  name="sizeB"
                  fullWidth
                  variant="outlined"
                  value={sizeB}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  helperText={<ErrorMessage name="sizeB" />}
                  error={!!props.errors.sizeB && props.touched.sizeB}
                />

                <TextField
                  label={t('form.aproximateSizeW')}
                  name="sizeW"
                  fullWidth
                  variant="outlined"
                  value={sizeW}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  helperText={<ErrorMessage name="sizeW" />}
                  error={!!props.errors.sizeW && props.touched.sizeW}
                />

                <TextField
                  label={t('form.weight')}
                  name="weight"
                  fullWidth
                  variant="outlined"
                  value={weight}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  helperText={<ErrorMessage name="weight" />}
                  error={!!props.errors.weight && props.touched.weight}
                  required
                />

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isFlammable}
                        onChange={e => setIsFlammable(e.target.checked)}
                        inputProps={{
                          'aria-label': 'controlled',
                        }}
                      />
                    }
                    label={t('form.isLoadFlammable')}
                  />
                </FormGroup>
                <Box mb={2}>
                  <Button variant="contained" component="label">
                    {t('form.uploadImages')}
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  {/* <label htmlFor="upload-image">
                    <Button variant="contained" component="span">
                        {t('form.uploadImages')}
                    </Button>
                    <input
                      id="upload-image"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleFileUpload}
                    />
                  </label> */}
                  {!!fileList.length && (
                    <Box
                      sx={{
                        marginY: 2,
                        background: 'lightgrey',
                      }}
                    >
                      {fileList.map((fileUrl: string, index: number) => (
                        <Box
                          sx={{
                            display: 'flex',
                            overflow: 'hidden',
                            position: 'relative',
                            padding: 1,
                            '&:hover': {
                              background: 'grey',
                              '.deleteIcon': {
                                display: 'inherit',
                                background: 'white',
                                borderRadius: '24px',
                              },
                            },
                          }}
                        >
                          <Box
                            className="deleteIcon"
                            sx={{
                              position: 'absolute',
                              right: '8px',
                              display: 'none',
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleRemove(index)}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Box>
                          <img
                            src={fileUrl}
                            alt="Uploaded Image"
                            width="100%"
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => setActiveStep(0)}
                >
                  {t('form.navigation.back')}
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  {t('form.navigation.next')}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default withTranslation('common')(LoadFormComponent);
