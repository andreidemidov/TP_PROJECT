using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TP_PROJECT_FreeLancePlatform_Api.Interface
{
    public interface IGenericInteface<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetById(int id);

        Task Create(TEntity entity);

        Task Update(int id, TEntity entity);

        Task Delete(int id);
    }
}
