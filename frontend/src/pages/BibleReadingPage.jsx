import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { bibleAxios } from '../axiosInstance';

import InputBase from '@material-ui/core/InputBase';
import {
    Container,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@material-ui/core';
const axios = require('axios');

const BibleReadingPage = () => {
    const classes = useStyles();
    const [bookSelect, setbookSelect] = useState('');
    const [chapterSelect, setChapterSelect] = useState('');
    const [verseSelect, setVerseSelect] = useState('');
    const [bookSearch, setBookSearch] = useState('');

    const [loading, setLoading] = useState(true);
    const [bibles, setBibles] = useState('');
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState('');
    const [verses, setVerses] = useState('');
    const [scripture, setScripture] = useState([]);

    useEffect(() => {
        bibleAxios
            .get('/55212e3cf5d04d49-01')
            .then((res) => {
                const fetchedBible = res.data.data.abbreviationLocal;
                setBibles(fetchedBible);
            })
            .catch((err) => console.log(err))
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        bibleAxios
            .get(
                '55212e3cf5d04d49-01/books?include-chapters=true&include-chapters-and-sections=true',
            )

            .then((res) => {
                const fetchBooks = res.data.data;
                setBooks(fetchBooks);
            })
            .catch((err) => console.log(err))
            .then(() => {
                setLoading(false);
            });
    }, []);

    const handleBookChange = (e) => {
        setbookSelect(e.target.value);
    };
    const handleChapterChange = (e) => {
        setChapterSelect(e.target.value);
    };
    const handleVerseChange = (e) => {
        setVerseSelect(e.target.value);
    };
    const handleBookSearch = (e) => {
        setBookSearch(e.target.value);
    };

    const fetchChapter = (book) => {
        bibleAxios
            .get(`/55212e3cf5d04d49-01/books/${book.id}/chapters`)
            .then((res) => {
                setChapters(res.data?.data);
            })
            .catch((err) => console.log(err));
    };

    const fetchVerses = (verseId) => {
        bibleAxios
            .get(`/55212e3cf5d04d49-01/chapters/${verseId}/verses`)
            .then((res) => {
                setVerses(res.data.data);
            })
            .catch((err) => console.log(err));
    };

    const readScriptsRecursive = (content) => {
        let scripture = [];

        if (content.text) {
            scripture.push(content.text);
        }
        if (content.items) {
            return scripture.concat(
                ...content.items.map((subTree) => readScriptsRecursive(subTree)),
            );
        }
        return scripture;
    };

    const fetchScripture = (verseId) => {
        bibleAxios
            .get(
                `/55212e3cf5d04d49-01/verses/${verseId}?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true&use-org-id=false`,
            )
            .then((res) => {
                console.log('1', res);
                console.log('2', res.data.data.content);
                // use recursion
                const fetchedItems = res?.data?.data?.content[0];
                setScripture([readScriptsRecursive(fetchedItems).join('')]);
                console.log(readScriptsRecursive(fetchedItems));

                console.log('3', fetchedItems);
            })
            .catch((err) => console.log(err));
    };

    console.log(scripture);

    if (loading) {
        return <h1>Loading ...</h1>;
    }

    return (
        <Container>
            <div className={classes.search}>
                <div>
                    <SearchIcon className={classes.SearchIcon} />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel>Please select a book here</InputLabel>
                    <Select
                        labelId="book"
                        id="book-select"
                        value={bookSelect}
                        onChange={handleBookChange}
                    >
                        <Input fullWidth value={bookSearch} onChange={handleBookSearch} />
                        {books.map((book) => {
                            return (
                                <MenuItem
                                    key={book.name}
                                    value={book.name}
                                    onClick={() => fetchChapter(book)}
                                >
                                    {book.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Please select a chapter here</InputLabel>
                    <Select
                        labelId="chapter"
                        id="chapter-select"
                        value={chapterSelect}
                        onChange={handleChapterChange}
                    >
                        {chapters
                            ? chapters.map((chapter) => {
                                  return (
                                      <MenuItem
                                          key={chapter.reference}
                                          value={chapter.reference}
                                          onClick={() => fetchVerses(chapter.id)}
                                      >
                                          {chapter.reference}
                                      </MenuItem>
                                  );
                              })
                            : ''}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Please select verse here</InputLabel>
                    <Select
                        labelId="verse"
                        id="chapter-select"
                        value={verseSelect}
                        onChange={handleVerseChange}
                    >
                        {verses
                            ? verses.map((verse) => {
                                  return (
                                      <MenuItem
                                          key={verse.reference}
                                          value={verse.reference}
                                          onClick={() => fetchScripture(verse.id)}
                                      >
                                          {verse.reference}
                                      </MenuItem>
                                  );
                              })
                            : ''}
                    </Select>
                </FormControl>
            </div>
            <div>
                {scripture
                    ? scripture.map((eachScripture) => {
                          return <Typography>{eachScripture}</Typography>;
                      })
                    : ''}
            </div>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    search: {
        display: 'flex',
        position: 'relative',
        marginTop: '40px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));
export default BibleReadingPage;
