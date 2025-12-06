<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\Book;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    public function index()
    {
        $borrowings = Borrowing::with('book.category')->get();
        return response()->json($borrowings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'borrower_name' => 'required|string|max:255',
            'borrower_email' => 'required|email',
            'borrow_date' => 'required|date',
        ]);

        $book = Book::find($request->book_id);

        if ($book->stock <= 0) {
            return response()->json([
                'message' => 'Book is out of stock'
            ], 400);
        }

        $borrowing = Borrowing::create($request->all());
        
        // Kurangi stok buku
        $book->decrement('stock');

        return response()->json([
            'message' => 'Borrowing created successfully',
            'borrowing' => $borrowing->load('book')
        ], 201);
    }

    public function show(Borrowing $borrowing)
    {
        return response()->json($borrowing->load('book.category'));
    }

    public function update(Request $request, Borrowing $borrowing)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'borrower_name' => 'required|string|max:255',
            'borrower_email' => 'required|email',
            'borrow_date' => 'required|date',
            'return_date' => 'nullable|date',
            'status' => 'required|in:borrowed,returned',
        ]);

        $oldStatus = $borrowing->status;
        $borrowing->update($request->all());

        // Jika status berubah dari borrowed ke returned, tambah stok
        if ($oldStatus === 'borrowed' && $request->status === 'returned') {
            $borrowing->book->increment('stock');
        }

        return response()->json([
            'message' => 'Borrowing updated successfully',
            'borrowing' => $borrowing->load('book')
        ]);
    }

    public function destroy(Borrowing $borrowing)
    {
        // Jika masih dipinjam, kembalikan stok
        if ($borrowing->status === 'borrowed') {
            $borrowing->book->increment('stock');
        }

        $borrowing->delete();

        return response()->json([
            'message' => 'Borrowing deleted successfully'
        ]);
    }
}