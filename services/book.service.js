import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptybook,
    getDefaultFilter,
    updateReview,
    getNextBookId,
    getPrevBookId,
    googleBooksQuery
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            // render only books that contains the *TXT*
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            // render only books that *LOWER* price then Max-Price
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }

            // render only books that on *SALE*
            if (filterBy.isOnSale) {
                books = books.filter(book => book.listPrice.isOnSale)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptybook(title = '', price = '', isOnSale = false, thumbnail = 'http://coding-academy.org/books-photos/2.jpg') {
    return { id: '', title, price, isOnSale, thumbnail }
}

function getDefaultFilter() {
    return { txt: '', price: '', isOnSale: false }
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then((books) => {
            let bookIdx = books.findIndex(book => book.id === bookId)
            if (bookIdx === books.length - 1) bookIdx = -1
            return !!books[bookIdx + 1].id && books[bookIdx + 1].id
        })
}

function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then((books) => {
            let bookIdx = books.findIndex(book => book.id === bookId)
            if (bookIdx === 0) bookIdx = books.length
            return !!books[bookIdx - 1].id && books[bookIdx - 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY) || _booksData()
    if (books.length === 0) books = _booksData()
    utilService.saveToStorage(BOOK_KEY, books)
}

function updateReview(bookId, bookReview) {
    console.log('bookReview', bookReview)
    console.log('bookId', bookId)
    get(bookId).then(console.log)
}

function googleBooksQuery(txt) {  //temp hard coded
    return (
        {
            "kind": "books#volumes",
            "totalItems": 451,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "nBuA0hmspdMC",
                    "etag": "zdLxrjEq87o",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/nBuA0hmspdMC",
                    "volumeInfo": {
                        "title": "Effective JavaScript",
                        "subtitle": "68 Specific Ways to Harness the Power of JavaScript",
                        "authors": [
                            "David Herman"
                        ],
                        "publisher": "Addison-Wesley",
                        "publishedDate": "2012-11-26",
                        "description": "“It’s uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It’s one of the few books on JS that I’ll recommend without hesitation.” —Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language’s flexible, expressive features and how to avoid its pitfalls. No matter how long you’ve been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma’s JavaScript standardization committee, illuminates the language’s inner workings as never before—helping you take full advantage of JavaScript’s expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you’ll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript’s functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript’s unique “run-to-completion” approach to concurrency",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9780132902250"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "0132902257"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": true
                        },
                        "pageCount": 240,
                        "printType": "BOOK",
                        "categories": [
                            "Computers"
                        ],
                        "averageRating": 5,
                        "ratingsCount": 1,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "2.7.6.0.preview.3",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=nBuA0hmspdMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=nBuA0hmspdMC&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=nBuA0hmspdMC&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Effective_JavaScript.html?hl=&id=nBuA0hmspdMC"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "PARTIAL",
                        "embeddable": true,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=nBuA0hmspdMC&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "SAMPLE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "You’ll find when you finish the book that you’ve gained a strong and comprehensive sense of mastery.” —Paul Irish, developer advocate, Google Chrome “This is not a book for those looking for shortcuts; rather it is hard-won ..."
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "wVDCjwEACAAJ",
                    "etag": "hdXSjZ9Z/tY",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/wVDCjwEACAAJ",
                    "volumeInfo": {
                        "title": "Effective Javascript",
                        "subtitle": "68 Specific Ways to Harness the Power of Javascript",
                        "authors": [
                            "David Herman"
                        ],
                        "publishedDate": "2016-03-08",
                        "description": "\"It's uncommon to have a programming language wonk who can speak in such comfortable and friendly language as David does. His walk through the syntax and semantics of JavaScript is both charming and hugely insightful; reminders of gotchas complement realistic use cases, paced at a comfortable curve. You'll find when you finish the book that you've gained a strong and comprehensive sense of mastery.\"-Paul Irish, developer advocate, Google Chrome \"This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It's one of the few books on JS that I'll recommend without hesitation.\"-Alex Russell, TC39 member, software engineer, Google In order to truly master JavaScript, you need to learn how to work effectively with the language's flexible, expressive features and how to avoid its pitfalls. No matter how long you've been writing JavaScript code, Effective JavaScript will help deepen your understanding of this powerful language, so you can build more predictable, reliable, and maintainable programs. Author David Herman, with his years of experience on Ecma's JavaScript standardization committee, illuminates the language's inner workings as never before-helping you take full advantage of JavaScript's expressiveness. Reflecting the latest versions of the JavaScript standard, the book offers well-proven techniques and best practices you'll rely on for years to come. Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You'll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency. Key features include Better ways to use prototype-based object-oriented programming Subtleties and solutions for working with arrays and dictionary objects Precise and practical explanations of JavaScript's functions and variable scoping semantics Useful JavaScript programming patterns and idioms, such as options objects and method chaining In-depth guidance on using JavaScript's unique \"run-to-completion\" approach to concurrency",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "1530427223"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9781530427222"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 228,
                        "printType": "BOOK",
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=wVDCjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=wVDCjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Effective_Javascript.html?hl=&id=wVDCjwEACAAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=wVDCjwEACAAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "&quot;-Paul Irish, developer advocate, Google Chrome &quot;This is not a book for those looking for shortcuts; rather it is hard-won experience distilled into a guided tour. It&#39;s one of the few books on JS that I&#39;ll recommend without hesitation."
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "qBiEjwEACAAJ",
                    "etag": "gX/Mr6D+0+k",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/qBiEjwEACAAJ",
                    "volumeInfo": {
                        "title": "Effective JavaScript",
                        "subtitle": "68 Specific Ways to Harness the Power of JavaScript",
                        "publishedDate": "2013",
                        "description": "Provides information on how to write better JavaScript programs, covering such topics as functions, arrays, library and API design, and concurrency.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "0132902281"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9780132902281"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 206,
                        "printType": "BOOK",
                        "categories": [
                            "JavaScript (Computer program language)"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=qBiEjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=qBiEjwEACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Effective_JavaScript.html?hl=&id=qBiEjwEACAAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=qBiEjwEACAAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "Provides information on how to write better JavaScript programs, covering such topics as functions, arrays, library and API design, and concurrency."
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "v3-TDwAAQBAJ",
                    "etag": "/aDKZIZ/lYw",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/v3-TDwAAQBAJ",
                    "volumeInfo": {
                        "title": "JavaScript",
                        "subtitle": "Best Practices to Programming Code with JavaScript",
                        "authors": [
                            "Charlie Masterson"
                        ],
                        "publisher": "E.C. Publishing via PublishDrive",
                        "publishedDate": "2017-01-05",
                        "description": "Learn how to write effective and efficient JavaScript code for programming success and continue your progress towards JavaScript programming mastery! In this Definitive JavaScript Guide on Best Practices, you're about to discover how to... Code more efficiently for Better Performance and Results! Spot the Common JavaScript Mistakes - From mismatched quotes, bad line breaks, HTML conflicts and more! Apply Recommended JavaScript approaches - The DO's and DONT's of JavaScript programming that will help you code achieve its goals immensely! Use Comments and Logging – the proper way to use comments and logging approaches that readers would thank you for ... And much, much more! Added Benefits of owning this book: Gain a better grasp of efficient and effective JavaScript code to achieve programming success Speed up your programming abilities by avoiding time-wasting mistakes Gain the most important Best Practice concepts in your path towards JavaScript programming mastery! Learning JavaScript can help you in many ways both professionally and personally. By implementing the lessons in this book, not only would you learn one of today's most popular computer languages, but it will serve as your guide in accomplishing your JavaScript goals – whether as a fun hobby or as a starting point into a successful and long term Web Development career. Take action today and make your programming career goals a reality! Scroll to the top of the page and select the \"Buy now\" button.",
                        "industryIdentifiers": [
                            {
                                "type": "OTHER",
                                "identifier": "PKEY:6610000083749"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": true
                        },
                        "pageCount": 50,
                        "printType": "BOOK",
                        "categories": [
                            "Computers"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "1.48.45.0.preview.3",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=v3-TDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=v3-TDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=v3-TDwAAQBAJ&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=v3-TDwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/JavaScript.html?hl=&id=v3-TDwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "PARTIAL",
                        "embeddable": true,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": true,
                            "acsTokenLink": "http://books.google.com/books/download/JavaScript-sample-epub.acsm?id=v3-TDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                        },
                        "pdf": {
                            "isAvailable": true,
                            "acsTokenLink": "http://books.google.com/books/download/JavaScript-sample-pdf.acsm?id=v3-TDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=v3-TDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "SAMPLE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "Learn how to write effective and efficient JavaScript code for programming success and continue your progress towards JavaScript programming mastery! In this Definitive JavaScript Guide on Best Practices, you&#39;re about to discover how to."
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "zvuGAQAACAAJ",
                    "etag": "p+nOMKk1Zjc",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/zvuGAQAACAAJ",
                    "volumeInfo": {
                        "title": "Effective Javascript",
                        "subtitle": "30 Specific Ways to Harness the Power of Javascript",
                        "authors": [
                            "David Herman"
                        ],
                        "publishedDate": "2012",
                        "industryIdentifiers": [
                            {
                                "type": "OTHER",
                                "identifier": "OCLC:796839651"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 132,
                        "printType": "BOOK",
                        "categories": [
                            "Electronic books"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=zvuGAQAACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=zvuGAQAACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Effective_Javascript.html?hl=&id=zvuGAQAACAAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=zvuGAQAACAAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "25AEAwAAQBAJ",
                    "etag": "+IDDLVWJ5yM",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/25AEAwAAQBAJ",
                    "volumeInfo": {
                        "title": "You Don't Know JS: Scope & Closures",
                        "authors": [
                            "Kyle Simpson"
                        ],
                        "publisher": "\"O'Reilly Media, Inc.\"",
                        "publishedDate": "2014-03-10",
                        "description": "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. This concise yet in-depth guide takes you inside scope and closures, two core concepts you need to know to become a more efficient and effective JavaScript programmer. You’ll learn how and why they work, and how an understanding of closures can be a powerful part of your development skillset. Like other books in the \"You Don’t Know JS\" series, Scope and Closures dives into trickier parts of the language that many JavaScript programmers simply avoid. Armed with this knowledge, you can achieve true JavaScript mastery. Learn about scope, a set of rules to help JavaScript engines locate variables in your code Go deeper into nested scope, a series of containers for variables and functions Explore function- and block-based scope, “hoisting”, and the patterns and benefits of scope-based hiding Discover how to use closures for synchronous and asynchronous tasks, including the creation of JavaScript libraries",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9781449335540"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "1449335543"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": true
                        },
                        "pageCount": 105,
                        "printType": "BOOK",
                        "categories": [
                            "Computers"
                        ],
                        "averageRating": 5,
                        "ratingsCount": 1,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "1.7.8.0.preview.3",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=25AEAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=25AEAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=25AEAwAAQBAJ&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=25AEAwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/You_Don_t_Know_JS_Scope_Closures.html?hl=&id=25AEAwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "PARTIAL",
                        "embeddable": true,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": true
                        },
                        "pdf": {
                            "isAvailable": true
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=25AEAwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "SAMPLE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language."
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "--gvDwAAQBAJ",
                    "etag": "bRXpwL2kJ+o",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/--gvDwAAQBAJ",
                    "volumeInfo": {
                        "title": "An Effective Guide to Modern JavaScript",
                        "subtitle": "(ECMAScript 2017 / ES 8)",
                        "authors": [
                            "Chong Lip Phang"
                        ],
                        "publisher": "Chong Lip Phang",
                        "publishedDate": "2017-08-08",
                        "description": "ES8 was finalized in June 2017. This book: - effectively teaches standard JavaScript from A to Z. - includes all the JavaScript common APIs, presented in a highly organized fashion. - lists in the Appendix the new features introduced in each JavaScript edition from ES5 to ES8 and beyond, and illustrates all of them. - clearly explains advanced concepts such as closures, Proxy, generators, Promise, async functions, and Atomics. - covers OOP techniques -- classical JavaScript OOP, the new 'class' syntax, data encapsulation, multiple inheritance, abstract classes, object relay etc. - teaches you how to define and use iterators and various iterables. - turns you into an efficient JavaScript coder.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9781974207923"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "1974207927"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": true
                        },
                        "pageCount": 127,
                        "printType": "BOOK",
                        "categories": [
                            "Computers"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=--gvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=--gvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=--gvDwAAQBAJ&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=--gvDwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/An_Effective_Guide_to_Modern_JavaScript.html?hl=&id=--gvDwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "PARTIAL",
                        "embeddable": true,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": true,
                            "acsTokenLink": "http://books.google.com/books/download/An_Effective_Guide_to_Modern_JavaScript-sample-pdf.acsm?id=--gvDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=--gvDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "SAMPLE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "This book: - effectively teaches standard JavaScript from A to Z. - includes all the JavaScript common APIs, presented in a highly organized fashion. - lists in the Appendix the new features introduced in each JavaScript edition from ES5 to ..."
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "O_d5DwAAQBAJ",
                    "etag": "+pUCYY8Z3Hg",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/O_d5DwAAQBAJ",
                    "volumeInfo": {
                        "title": "Full Stack JavaScript",
                        "subtitle": "Learn Backbone.js, Node.js, and MongoDB",
                        "authors": [
                            "Azat Mardan"
                        ],
                        "publisher": "Apress",
                        "publishedDate": "2018-11-14",
                        "description": "Learn agile JavaScript web development using the latest cutting-edge front-end and back-end technologies including Node.js, MongoDB, Backbone.js, Parse.com, Heroku, and Microsoft Azure. Using a key project example of a message board app, you will learn the foundations of a typical web application: fetching data, displaying it, and submitting new data. Practical examples of the app build are provided with multiple technologies and all code examples are in full color. This book will save you many hours by providing a hand-picked and tested collection of quick start guides that will enable you to spend less time learning and more time building your own applications. Completely updated for this second edition, Full Stack JavaScript uses current versions of all technologies, including ES6/ES2015 and the latest versions of Node and npm. Prototype fast and ship code that matters! What You'll Learn Use a collection of quick start guides, tutorials, and suggestions, to enhance several development appsReview virtually all setup and deployment step-by-step.Work with Chat web/mobile applications Put front-end and back-end components together and deploy them to production environmentWho This Book Is For Programmers who want to learn more about effective JavaScript coding",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9781484237182"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "1484237188"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": true
                        },
                        "pageCount": 315,
                        "printType": "BOOK",
                        "categories": [
                            "Computers"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "0.0.1.0.preview.1",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=O_d5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=O_d5DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=O_d5DwAAQBAJ&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=O_d5DwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Full_Stack_JavaScript.html?hl=&id=O_d5DwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "PARTIAL",
                        "embeddable": true,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": true,
                            "acsTokenLink": "http://books.google.com/books/download/Full_Stack_JavaScript-sample-pdf.acsm?id=O_d5DwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=O_d5DwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "SAMPLE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "Completely updated for this second edition, Full Stack JavaScript uses current versions of all technologies, including ES6/ES2015 and the latest versions of Node and npm. Prototype fast and ship code that matters!"
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "wD63DwAAQBAJ",
                    "etag": "qrP6jVR7yws",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/wD63DwAAQBAJ",
                    "volumeInfo": {
                        "title": "Effective TypeScript",
                        "subtitle": "62 Specific Ways to Improve Your TypeScript",
                        "authors": [
                            "Dan Vanderkam"
                        ],
                        "publisher": "O'Reilly Media",
                        "publishedDate": "2019-10-17",
                        "description": "TypeScript is a typed superset of JavaScript with the potential to solve many of the headaches for which JavaScript is famous. But TypeScript has a learning curve of its own, and understanding how to use it effectively can take time. This book guides you through 62 specific ways to improve your use of TypeScript. Author Dan Vanderkam, a principal software engineer at Sidewalk Labs, shows you how to apply these ideas, following the format popularized by Effective C++ and Effective Java (both from Addison-Wesley). You’ll advance from a beginning or intermediate user familiar with the basics to an advanced user who knows how to use the language well. Effective TypeScript is divided into eight chapters: Getting to Know TypeScript TypeScript’s Type System Type Inference Type Design Working with any Types Declarations and @types Writing and Running Your Code Migrating to TypeScript",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9781492053712"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "1492053716"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": true
                        },
                        "pageCount": 264,
                        "printType": "BOOK",
                        "categories": [
                            "Computers"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "0.3.1.0.preview.1",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=wD63DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=wD63DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=wD63DwAAQBAJ&printsec=frontcover&dq=effective+javascript&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=wD63DwAAQBAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Effective_TypeScript.html?hl=&id=wD63DwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "PARTIAL",
                        "embeddable": true,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": true
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=wD63DwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "SAMPLE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "But TypeScript has a learning curve of its own, and understanding how to use it effectively can take time. This book guides you through 62 specific ways to improve your use of TypeScript."
                    }
                },
                {
                    "kind": "books#volume",
                    "id": "MjXOAQAACAAJ",
                    "etag": "kxhVHQTaywk",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/MjXOAQAACAAJ",
                    "volumeInfo": {
                        "title": "JavaScript",
                        "subtitle": "2 Books in 1: Beginner's Guide + Best Practices to Programming Code with JavaScript",
                        "authors": [
                            "Charlie Masterson"
                        ],
                        "publisher": "Createspace Independent Publishing Platform",
                        "publishedDate": "2017-03-07",
                        "description": "JavaScript Best Seller: 2 Books In 1! Own this Best-Selling JavaScript Computer Programming Bundle that contains: JavaScript: Beginner's Guide to Programming Code with JavaScript JavaScript: Best Practices to Programming Code with JavaScript For a limited time only, get to own this Amazon top seller for just $21.00! Regularly priced at $30.76. Save time and money by learning the basic essentials of JavaScript AND how to write better and more efficient JavaScript code - all in 1 book! Learn JavaScript programming today and begin your path towards JavaScript programming mastery! Book 1 - JavaScript: Beginner's Guide to Programming Code with JavaScript In the Definitive JavaScript Beginner's Guide, you're about to discover how to... Program code in JavaScript through learning the core essentials that every JavaScript programmer must know. JavaScript is on the internet everywhere we look. Thanks to JavaScript, many of the sites that you enjoy are able to run the way that they are supposed to. And when you understand how JavaScript works, you are going to have the advantage of knowing how websites function effectively. Here is a Preview of What You'll Learn... Essentials of JavaScript programming. Quickly pick up the code examples found on the book and start learning the concepts as you code Major aspects of JavaScript programming - including concepts that are found on other computer languages Various mechanics of JavaScript programming: variables, conditional statements, etc. and why learning these core principles are important to JavaScript programming success How JavaScript and HTML are able to effectively work together to create better web pages ... And much, much more! Added Benefits of owning this book: Get a better understanding of the JavaScript programming language Learn the basic building blocks of the JavaScript programming language Learn how to write effective and efficient JavaScript code for programming success and continue your progress towards JavaScript programming mastery! JavaScript: Best Practices to Programming Code with JavaScript In this Definitive JavaScript Guide on Best Practices, you're about to discover how to... Code more efficiently for Better Performance and Results! Spot the Common JavaScript Mistakes - From mismatched quotes, bad line breaks, HTML conflicts and more! Apply Recommended JavaScript approaches - The DO's and DONT's of JavaScript programming that will help you code achieve its goals immensely! Use Comments and Logging - the proper way to use comments and logging approaches that readers would thank you for! ... And much, much more! Added Benefits of owning this book: Gain a better grasp of efficient and effective JavaScript code to achieve programming success Speed up your programming abilities by avoiding time-wasting mistakes Gain the most important Best Practice concepts in your path towards JavaScript programming mastery! Learning JavaScript can help you in many ways both professionally and personally. By implementing the lessons in this book, not only would you learn one of today's most popular computer languages, but it will serve as your guide in accomplishing your JavaScript goals - whether as a fun hobby or as a starting point into a successful and long term Web Development career. Take action today and reach your JavaScript programming goals. Own this book today for a limited time discount! Scroll to the top of the page and select the \"Buy now\" button.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "1544267444"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9781544267449"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 178,
                        "printType": "BOOK",
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=MjXOAQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=MjXOAQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com/books?id=MjXOAQAACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
                        "infoLink": "http://books.google.com/books?id=MjXOAQAACAAJ&dq=effective+javascript&hl=&as_pt=BOOKS&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/JavaScript.html?hl=&id=MjXOAQAACAAJ"
                    },
                    "saleInfo": {
                        "country": "IL",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "IL",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=MjXOAQAACAAJ&hl=&as_pt=BOOKS&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "And when you understand how JavaScript works, you are going to have the advantage of knowing how websites function effectively. Here is a Preview of What You&#39;ll Learn... Essentials of JavaScript programming."
                    }
                }
            ]
        }
    )
}

function _booksData() {
    return (
        [
            {
                "id": "OXeMG8wNskc",
                "title": "metus hendrerit",
                "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
                "authors": [
                    "Barbara Cartland"
                ],
                "publishedDate": 1999,
                "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                "pageCount": 713,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 109,
                    "currencyCode": "EUR",
                    "currencySymbol": "€",
                    "isOnSale": false
                }
            },
            {
                "id": "JYOJa2NpSCq",
                "title": "morbi",
                "subtitle": "lorem euismod dictumst inceptos mi",
                "authors": [
                    "Barbara Cartland"
                ],
                "publishedDate": 1978,
                "description": "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
                "pageCount": 129,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 19,
                    "currencyCode": "EUR",
                    "currencySymbol": "€",
                    "isOnSale": true
                }
            },
            {
                "id": "1y0Oqts35DQ",
                "title": "at viverra venenatis",
                "subtitle": "gravida libero facilisis rhoncus urna etiam",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1999,
                "description": "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
                "pageCount": 972,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 20,
                    "currencyCode": "ILS",
                    "currencySymbol": "₪",
                    "isOnSale": false
                }
            },
            {
                "id": "kSnfIJyikTP",
                "title": "dictum",
                "subtitle": "augue eu consectetur class curabitur conubia ligula in ullamcorper",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1978,
                "description": "interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam",
                "pageCount": 303,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 30,
                    "currencyCode": "EUR",
                    "currencySymbol": "€",
                    "isOnSale": true
                }
            },
            {
                "id": "f4iuVmbuKCC",
                "title": "sem himenaeos aptent",
                "subtitle": "interdum per habitasse luctus purus est",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 2011,
                "description": "et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed",
                "pageCount": 337,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 19,
                    "currencyCode": "USD",
                    "currencySymbol": "$",
                    "isOnSale": false
                }
            },
            {
                "id": "U2rfZO6oBZf",
                "title": "mi ante posuere",
                "subtitle": "sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 1978,
                "description": "senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in",
                "pageCount": 748,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/1.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 91,
                    "currencyCode": "USD",
                    "currencySymbol": "$",
                    "isOnSale": true
                }
            },
            {
                "id": "xI0wrXaaAcq",
                "title": "non",
                "subtitle": "leo tortor per dapibus mattis ut conubia porttitor ligula viverra",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 2011,
                "description": "nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque",
                "pageCount": 65,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 90,
                    "currencyCode": "USD",
                    "currencySymbol": "$",
                    "isOnSale": false
                }
            },
            {
                "id": "9laHCEdSpFy",
                "title": "tristique",
                "subtitle": "consectetur a eu tincidunt condimentum amet nisi",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1999,
                "description": "magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem",
                "pageCount": 299,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/11.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 176,
                    "currencyCode": "EUR",
                    "currencySymbol": "€",
                    "isOnSale": false
                }
            },
            {
                "id": "nGhVwZvGCGp",
                "title": "urna ornare gravida",
                "subtitle": "sem vestibulum semper convallis pharetra tempor himenaeos ut",
                "authors": [
                    "Jin Yong"
                ],
                "publishedDate": 2011,
                "description": "porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla",
                "pageCount": 803,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 116,
                    "currencyCode": "USD",
                    "currencySymbol": "$",
                    "isOnSale": true
                }
            },
            {
                "id": "Q8Q9Lsd03BD",
                "title": "consequat neque volutpat",
                "subtitle": "vel quis taciti fermentum feugiat ullamcorper curae praesent",
                "authors": [
                    "Dr. Seuss"
                ],
                "publishedDate": 1978,
                "description": "curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare",
                "pageCount": 891,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/5.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 145,
                    "currencyCode": "EUR",
                    "currencySymbol": "€",
                    "isOnSale": false
                }
            },
            {
                "id": "bd7a76kARao",
                "title": "risus",
                "subtitle": "pretium bibendum pharetra curabitur quisque dictumst",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 2018,
                "description": "auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus",
                "pageCount": 86,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/16.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 157,
                    "currencyCode": "ILS",
                    "currencySymbol": "₪",
                    "isOnSale": true
                }
            },
            {
                "id": "qKyG0vqeO3e",
                "title": "interdum etiam vulputate",
                "subtitle": "velit sapien eget tincidunt nunc tortor",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 2018,
                "description": "aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad",
                "pageCount": 882,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/17.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 57,
                    "currencyCode": "USD",
                    "currencySymbol": "$",
                    "isOnSale": true
                }
            },
            {
                "id": "2RvT48ZNInj",
                "title": "sagittis justo",
                "subtitle": "etiam primis proin praesent placerat nisi fermentum nisi",
                "authors": [
                    "Agatha Christie"
                ],
                "publishedDate": 2011,
                "description": "nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus",
                "pageCount": 598,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/8.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 167,
                    "currencyCode": "ILS",
                    "currencySymbol": "₪",
                    "isOnSale": false
                }
            },
            {
                "id": "5z2s9pDXAYj",
                "title": "quam ullamcorper himenaeos",
                "subtitle": "ut placerat eu dapibus sapien sodales laoreet",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1999,
                "description": "etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam",
                "pageCount": 608,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/3.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 150,
                    "currencyCode": "USD",
                    "currencySymbol": "$",
                    "isOnSale": true
                }
            },
            {
                "id": "zBZu5cDEWha",
                "title": "quis",
                "subtitle": "suscipit turpis etiam turpis libero lobortis",
                "authors": [
                    "Jin Yong"
                ],
                "publishedDate": 2011,
                "description": "etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor",
                "pageCount": 583,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/6.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 58,
                    "currencyCode": "ILS",
                    "currencySymbol": "₪",
                    "isOnSale": true
                }
            },
            {
                "id": "aOI7tQuPZ2f",
                "title": "aliquam aliquet dapibus",
                "subtitle": "neque eu purus euismod placerat adipiscing odio egestas consequat",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 2011,
                "description": "dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt",
                "pageCount": 497,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/7.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 78,
                    "currencyCode": "USD",
                    "currencySymbol": "$",
                    "isOnSale": false
                }
            },
            {
                "id": "WBooB82Uvwu",
                "title": "class",
                "subtitle": "elit enim ultricies amet imperdiet a molestie class elementum venenatis",
                "authors": [
                    "Danielle Steel"
                ],
                "publishedDate": 1999,
                "description": "rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla",
                "pageCount": 804,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/10.jpg",
                "language": "en",
                "listPrice": {
                    "amount": 118,
                    "currencyCode": "ILS",
                    "currencySymbol": "₪",
                    "isOnSale": false
                }
            },
            {
                "id": "xm1z5bbZjlS",
                "title": "vitae",
                "subtitle": "class habitant at commodo semper ligula a bibendum",
                "authors": [
                    "Leo Tolstoy"
                ],
                "publishedDate": 1999,
                "description": "himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus",
                "pageCount": 231,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/12.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 60,
                    "currencyCode": "EUR",
                    "currencySymbol": "€",
                    "isOnSale": false
                }
            },
            {
                "id": "u3j6QIKLlJb",
                "title": "rhoncus vivamus",
                "subtitle": "nullam class risus amet senectus scelerisque etiam curabitur",
                "authors": [
                    "Agatha Christie"
                ],
                "publishedDate": 1978,
                "description": "torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis",
                "pageCount": 652,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
                "language": "he",
                "listPrice": {
                    "amount": 110,
                    "currencyCode": "USD",
                    "currencySymbol": "$",
                    "isOnSale": true
                }
            },
            {
                "id": "vxYYYdVlEH3",
                "title": "donec mi ullamcorper",
                "subtitle": "varius malesuada augue molestie sollicitudin faucibus mi eu tempus",
                "authors": [
                    "William Shakespeare"
                ],
                "publishedDate": 2011,
                "description": "aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed",
                "pageCount": 904,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
                "language": "sp",
                "listPrice": {
                    "amount": 186,
                    "currencyCode": "ILS",
                    "currencySymbol": "₪",
                    "isOnSale": true
                }
            }
        ]
    )
}

