import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import { Play } from 'phosphor-react';


const useStyles = makeStyles((theme) => ({
    link: {
        marginRight: 20,
        color: '#7db8ec',
        fontSize: '24px',
        marginLeft: 10
    },
    color: {
        backgroundColor: '#151019',
    },
    icon: {
        color: "#7db8ec"
    }
}))


export const Header = () => {
    const styles = useStyles();

    return (
            <AppBar position="sticky" className={styles.color}>
                <Toolbar>
                    <Play size={28} className={styles.icon}/>
                    <Link className={styles.link} variant="button" underline="none" href="#">
                        VIDEO DOWNLOADER
                    </Link>
                </Toolbar>
            </AppBar>
    )
}