import './reset.css'
import { Header } from "./components/Header"
import { Box, Button, Container, Grid, Link, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ArrowRight, DownloadSimple, MagnifyingGlass, Warning } from 'phosphor-react';
import { useState } from 'react';
import { api } from './services/api';
//validation
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form'
import { FileDownloadDoneSharp } from '@mui/icons-material';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 890,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    width: 600,
    height: 600,
    backgroundColor: "#FFFFFF",
    p: 2,
    m: 1,
    borderRadius: 5,
  },
  boxAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    width: 250,
  },
  button: {
    color: "#7db8ec",
  },
  downloadLink: {
    marginTop: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  errorMessage: {
    marginTop: 20,
    color: "#FF0000",
    fontSize: 20,
  }

}))

type Field = {
  field: string;
}

const createUserFormSchema = yup.object().shape({
  field: yup.string().required('Put a valid link')
})


export const App = () => {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [download, setDownload] = useState('')

  const { register, handleSubmit, formState: { errors }} = useForm<Field>({
    resolver: yupResolver(createUserFormSchema)
  })

  const styles = useStyles();

  const submit = async () => {
    if (url.includes('https://')) {
      await api.get(`/video/?url=${url}`)
      .then((response) => {
          console.log(response)
          setDownload(response.request.responseURL)
        })
        .catch((err) => {
          setError(err.response.data.error)
        })
    } else {
      setUrl('https://' + url)
    }
  }

  const handleValidateField: SubmitHandler<Field> = async () => {
    alert("Validated")
  }

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Box className={styles.container}>
          <Box className={styles.box}>

            <Box className={styles.boxAlign}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    // @ts-ignore
                    name="field"
                    // @ts-ignore
                    onChange={(e) => setUrl(e.target.value)}
                    className={styles.input}
                    value={url}
                    type="text"
                    label="Put your YouTube link here"
                    variant="outlined"
                    size="small"
                    //{...register('field')}
                  />
                  {errors.field && <span>{errors.field.message}</span>}
                </Grid>
                <Grid item xs={4}>
                  <Button
                    className={styles.button}
                    color="primary"
                    variant="contained"
                    startIcon={<MagnifyingGlass />}
                    //onSubmit={handleSubmit(handleValidateField)}
                    onClick={() => submit()}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>

              {
                download !== '' ? <Box className={styles.downloadLink}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography className={styles.text}>click to download</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Link href={download}>
                        <Button variant="contained" color="secondary" startIcon={<DownloadSimple size={24} />}>Download</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                :
                <Typography className={styles.errorMessage}>{error}</Typography>
              }
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}
