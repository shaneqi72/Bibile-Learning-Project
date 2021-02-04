import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '../components';

const HomePage = () => {
    const classes = useStyles();

    return (
        <Box>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation="0" className={classes.paper}></Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation="0" className={classes.paperTypo}>
                        <Typography color="initial">
                            「在基督徒的生活中，没有其他的操练比背诵金句得到更多的回馈。没有任何训练比背金句更有效、更值得。没有任何练习比它更能得到属灵的益处，你的祷告生活将因此而得以坚固；态度及人生观也将开始有所改变。你的心思意念会变得敏捷机警、观察入微。你的信心及确据会与日俱增，信仰更得以坚定不移。」
                            ---查理士．司温道(Charles R. Swindoll)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row-reverse"
                justify="center"
                elevation="0"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12} md={6}>
                    <Paper elevation="0" className={classes.paper}></Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation="0" className={classes.paperTypo}>
                        <Typography color="initial">
                            把神的话藏在心中，可帮助你：
                            对抗试探、更有智慧、作明智决定、抵抗压力、克胜逆境、悲痛时有安慰、传扬福音、灵命成长、结出圣灵果子、生出盼望、释放能力、洁净思想、增添信心、医治伤痛、丰富生命、改善与神的关系、改善与人的关系。
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation="0" className={classes.paper}></Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation="0" className={classes.paperTypo}>
                        <Typography color="initial">
                            当用各样的智慧，把基督的道理，丰丰富富的存在心里，（或作当把基督的道理丰丰富富的存在心里以各样的智慧）用诗章，颂词，灵歌，彼此教导，互相劝戒，心被恩感歌颂神。(西3：16)
                            这些事都已听见了。总意就是敬畏神，谨守他的诫命，这是人所当尽的本分。（或作这是众人的本分）因为人所作的事，连一切隐藏的事，无论是善是恶，神都必审问。
                            (传12：13-14)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        height: 200,
        backgroundColor: 'lightGreen',
        margin: '15px',
    },
    paperTypo: {
        width: 'auto',
        height: 200,
        margin: '15px',
    },
}));

export default HomePage;
