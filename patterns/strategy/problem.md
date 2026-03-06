# Problem: Text Compression Service

## Scenario

You are building a file storage service that compresses text data before saving. Different compression approaches are appropriate for different situations: some prioritize speed, others prioritize compression ratio, and some are optimized for specific content types.

## Requirements

1. Define a common interface for compression with:
   - `compress(input: string): string` — returns the compressed representation
   - `decompress(compressed: string): string` — restores the original text
   - `name(): string` — returns a human-readable name for the algorithm

2. Implement three compression approaches:
   - **RunLengthEncoding**: Replaces consecutive repeated characters with count+character (e.g., "aaabbc" becomes "3a2b1c"). Good for data with many repeated characters.
   - **DictionaryCompression**: Builds a dictionary of common words and replaces them with short tokens (e.g., "the" -> "$1"). Good for natural language text.
   - **NoCompression**: Returns the input unchanged. Used as a passthrough when compression is not needed.

3. Build a `StorageService` class that:
   - Accepts a compression approach at construction time
   - Allows switching the compression approach at runtime via `setCompression()`
   - `store(key: string, data: string)` — compresses and stores data in an internal map
   - `retrieve(key: string): string` — retrieves and decompresses data
   - `getStats(key: string)` — shows original size, compressed size, and compression ratio for a stored item

4. Demonstrate:
   - Store text with repeated characters using RunLengthEncoding
   - Store a paragraph of English text using DictionaryCompression
   - Switch to NoCompression and store raw data
   - Retrieve all items and verify they match the originals

## Expected Behavior

```
=== RunLengthEncoding ===
Stored "binary" (original: 24 chars, compressed: 8 chars, ratio: 67%)
Retrieved: "aaaaabbbbccccccccdddd" ✓

=== DictionaryCompression ===
Stored "essay" (original: 45 chars, compressed: 32 chars, ratio: 29%)
Retrieved: "the quick brown fox jumps over the lazy dog" ✓

=== NoCompression ===
Stored "config" (original: 18 chars, compressed: 18 chars, ratio: 0%)
Retrieved: "debug=true;level=5" ✓
```

## Constraints

- The `StorageService` must not contain any compression logic itself.
- Adding a new compression algorithm (e.g., HuffmanEncoding) should only require creating a new class, not modifying StorageService.
- The compression approach must be swappable at runtime without recreating the StorageService.
