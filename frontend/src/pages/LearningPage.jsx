import React from 'react';
import { Box } from '../components/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import LearningMobilePage from './LearningMobilePage';

const LearningPage = () => {
    const useStyles = makeStyles({
        table: {
            border: '1px solid black',
            borderCollapse: 'collapse',
            textAlign: 'center',
            justifyContent: 'center',
            marginLeft: '3rem',
            marginRight: '3rem',
        },
        box: {
            display: 'flex',
            justifyContent: 'center',
        },
        th: {
            border: '1px solid black',
            borderCollapse: 'collapse',
            textAlign: 'center',
            backgroundColor: 'lightblue',
        },
        td: {
            border: '1px solid black',
            borderCollapse: 'collapse',
            textAlign: 'center',
        },
        tr: {
            border: '1px solid black',
            borderCollapse: 'collapse',
            textAlign: 'center',
        },
    });
    const classes = useStyles();
    return (
        <>
            <Hidden xsDown>
                <Box className={classes.box}>
                    <h2 style={{ textAlign: 'center' }}>学 习 复 习 圣 经 金 句</h2>
                    <table className={classes.table}>
                        <tr className={classes.th}>
                            <th colSpan="6" className={classes.td}>
                                <h4>
                                    记录显示您共有12条金句需要学习或复习，其中2条是今天新学的金句。您大概还需要回答24道问题才可完成今日的学习。
                                </h4>
                            </th>
                        </tr>
                        <tr className={classes.tr}>
                            <td className={classes.td}>
                                <h5>问题（1/10）</h5>
                            </td>
                            <td className={classes.td} colSpan="5">
                                <h5>哥林多前书(1 Corinthians) 13:5 的经文是什么? (爱)</h5>
                            </td>
                        </tr>
                        <tr className={classes.tr}>
                            <td className={classes.td}>
                                <a href="!" type="button">
                                    看提示
                                </a>
                            </td>
                            <td className={classes.td}>
                                <h5>看前一句</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>看后一句</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>对答案</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>查考整章经文</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>新学金句</h5>
                            </td>
                        </tr>
                        <tr className={classes.tr}>
                            <td className={classes.td}>
                                <h5>不知道</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>好像学过</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>部分答对</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>答对，但很慢</h5>
                            </td>
                            <td className={classes.td} colSpan="2">
                                <h5>又快又准</h5>
                            </td>
                        </tr>
                    </table>
                    <br />

                    <table className={classes.table}>
                        <tr className={classes.tr}>
                            <th className={classes.th} colSpan="7">
                                学习统计
                            </th>
                        </tr>
                        <tr>
                            <td className={classes.td}>
                                <h5>学习记录</h5>{' '}
                            </td>
                            <td className={classes.td}>
                                <h5>成绩记录</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>头衔排名</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>头衔表</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>正常模式</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>最用功者记录</h5>
                            </td>
                            <td className={classes.td}>
                                <h5>用户登记列表</h5>
                            </td>
                        </tr>
                    </table>
                </Box>
            </Hidden>

            <Hidden smUp>
                <LearningMobilePage />
            </Hidden>
        </>
    );
};

export default LearningPage;
