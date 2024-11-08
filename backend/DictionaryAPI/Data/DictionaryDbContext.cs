using Microsoft.EntityFrameworkCore;
using DictionaryAPI.Models;

namespace DictionaryAPI.Data
{
    public class DictionaryDbContext : DbContext
    {
        public DictionaryDbContext(DbContextOptions<DictionaryDbContext> options)
            : base(options) { }

        public DbSet<Translation> Translations { get; set; }
    }
}


