<template>
    <div>
      <h1>Book Query Options</h1>
      <label for="order">Order by ISBN:</label>
        <select v-model="order" id="order">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
        </select>
        
        <label for="isbn-min">ISBN greater than:</label>
        <input type="number" v-model="isbnMin" id="isbn-min" placeholder="Enter ISBN" />

        <label for="limit">Limit (Number of results):</label>
        <input type="number" v-model="queryLimit" id="limit" placeholder="Enter number of books" />

        <button @click="fetchBooks">Search</button>

      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}

          <input v-model="book.name" placeholder="Update Name" />
          <input v-model="book.isbn" placeholder="Update ISBN" />
            <button @click="updateBook(book)">Update</button>

          <button @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
      <button v-if="hasMoreBooks" @click="loadMoreBooks">Load More</button>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, orderBy, limit, startAfter,getDocs,doc, updateDoc, deleteDoc} from 'firebase/firestore';


export default{
    setup(){
        const books = ref([]);
        const lastVisibleBook = ref(null);  
        const hasMoreBooks = ref(true);   

        const order = ref('asc');           
        const isbnMin = ref(1000);        
        const queryLimit = ref(5);   

        const fetchBooks = async () => {
            try {
                const q = query(
                collection(db, 'books'),
                where('isbn', '>', Number(isbnMin.value)),  
                orderBy('isbn', order.value),             
                limit(Number(queryLimit.value))     
                );
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    console.log("Fetched document:", doc.data());
                    booksArray.push({ id: doc.id, ...doc.data() });
                });
                books.value = booksArray;
                lastVisibleBook.value = querySnapshot.docs[querySnapshot.docs.length - 1];
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };
        const loadMoreBooks = async () => {
            try {
                const q = query(
                collection(db, 'books'),
                where('isbn', '>', Number(isbnMin.value)),
                orderBy('isbn', order.value),
                startAfter(lastVisibleBook.value), 
                limit(Number(queryLimit.value))   
                );

                const querySnapshot = await getDocs(q);
                const booksArray = [];

                querySnapshot.forEach((doc) => {
                booksArray.push({
                    id: doc.id,
                    ...doc.data(),
                    editedName: doc.data().name,
                    editedIsbn: doc.data().isbn,
                });
                });

                books.value = [...books.value, ...booksArray];  
                lastVisibleBook.value = querySnapshot.docs[querySnapshot.docs.length - 1];
                hasMoreBooks.value = querySnapshot.docs.length > 0;
            } catch (error) {
                console.error('Error loading more books: ', error);
            }
        };
        const deleteBook = async (bookId) => {
            try {
                await deleteDoc(doc(db, 'books', bookId));
                books.value = books.value.filter((book) => book.id !== bookId);
                alert('Book deleted successfully!');
            } catch (error) {
                console.error('Error deleting book: ', error);
            }
        };
        const updateBook = async (book) => {
            try {
                const isbnNumber = Number(book.isbn);

                const bookRef = doc(db, 'books', book.id);
                await updateDoc(bookRef, {
                name: book.name,
                isbn: isbnNumber,
                });
                alert('Book updated successfully!');
            } catch (error) {
                console.error('Error updating book: ', error);
            }
        };
        onMounted(() => {
            fetchBooks();
        });
        return {
            books,
            deleteBook,
            updateBook,
            loadMoreBooks,
            hasMoreBooks,
            order,
            isbnMin,
            queryLimit,
            fetchBooks,
        };
        
    },
};
</script>
