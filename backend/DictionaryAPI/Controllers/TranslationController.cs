using Microsoft.AspNetCore.Mvc;
using DictionaryAPI.Data;
using DictionaryAPI.Models;
using System;
using System.Linq;

namespace DictionaryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TranslationController : ControllerBase
    {
        private readonly DictionaryDbContext _context;

        public TranslationController(DictionaryDbContext context)
        {
            _context = context;
        }

        [HttpGet("{englishWord}")]
        public IActionResult GetTranslation(string englishWord)
        {
            var trimmedWord = englishWord.Trim();
            Console.WriteLine($"Received word: '{trimmedWord}'"); // Log input for debugging

            // Log each entry in the database for comparison
            foreach (var item in _context.Translations)
            {
                Console.WriteLine($"Database EnglishWord: '{item.EnglishWord}'");
            }

            // Match trimmed and case-insensitive values
            var translation = _context.Translations
                                      .FirstOrDefault(t => string.Equals(t.EnglishWord.Trim(), trimmedWord, StringComparison.OrdinalIgnoreCase));

            if (translation == null)
            {
                Console.WriteLine("Translation not found.");
                return NotFound(new { message = "Translation not found." });
            }

            Console.WriteLine($"Found translation: '{translation.HungarianTranslation}'");
            return Ok(new { hungarianTranslation = translation.HungarianTranslation });
        }
    }
}
