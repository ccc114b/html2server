import MiniSearch from 'npm:minisearch'

// A collection of documents for our examples
const documents = [
{
    id: 1,
    title: 'Moby Dick',
    text: 'Call me Ishmael. Some years ago...',
    category: 'fiction'
},
{
    id: 2,
    title: 'Zen and the Art of Motorcycle Maintenance',
    text: 'I can see by my watch...',
    category: 'fiction'
},
{
    id: 3,
    title: 'Neuromancer',
    text: 'The sky above the port was...',
    category: 'fiction'
},
{
    id: 4,
    title: 'Zen and the Art of Archery',
    text: 'At first sight it must seem...',
    category: 'non-fiction'
},
// ...and more
{
    id: 5,
    title: '人工 智慧 概論',
    text: '人工 智慧 概論',
    category: '教科書'
},
{
    id: 6,
    title: '人工 智慧 實作 LLM 模型與 OpenAI API',
    text: '人工 智慧 實作 LLM 模型與 OpenAI API',
    category: '教科書'
},
]

let miniSearch = new MiniSearch({
fields: ['title', 'text'], // fields to index for full-text search
storeFields: ['title', 'category'] // fields to return with search results
})

// Index all documents
miniSearch.addAll(documents)

// Search with default options
let results = miniSearch.search('zen art motorcycle')
console.log(results)
// => [
//   { id: 2, title: 'Zen and the Art of Motorcycle Maintenance', category: 'fiction', score: 2.77258, match: { ... } },
//   { id: 4, title: 'Zen and the Art of Archery', category: 'non-fiction', score: 1.38629, match: { ... } }
// ]
results = miniSearch.search('智慧')
console.log(results)
