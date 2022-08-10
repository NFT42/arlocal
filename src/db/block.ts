import { Knex } from 'knex';
import { Utils } from '../utils/utils';

export class BlockDB {
  private connection: Knex;

  constructor(connection: Knex) {
    this.connection = connection;
  }

  async getOne() {
    return this.connection.select('*').from('blocks');
  }

  async getByIndepHash(indepHash: string) {
    return (await this.connection.queryBuilder().select('*').from('blocks').where('id', '=', indepHash).limit(1))[0];
  }

  async mine(height: number, previous: string, txs: string[]) {
    try {
      const id = Utils.randomID(64);

      // await this.connection.transaction((trx) => {
      //   this.connection('blocks')
      //     .transacting(trx)
      //     .insert({
      //       id: id,
      //       height: height,
      //       mined_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      //       previous_block: previous,
      //       txs: txs,
      //       extended: JSON.stringify({}),
      //     }).then(trx.commit);
      // });

      await this.connection
        .insert({
          id: id,
          height: height,
          mined_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          previous_block: previous,
          txs: txs,
          extended: JSON.stringify({}),
        })
        .into('blocks');

      return id;
    } catch (error) {
      console.error({ error });
    }
  }
  async getLastBlock() {
    try {
      return (await this.connection('blocks').orderBy('created_at', 'desc').limit(1))[0];
    } catch (error) {
      console.error({ error });
    }
  }

  async getByHeight(height: number) {
    return (await this.connection.queryBuilder().select('*').from('blocks').where('height', '=', height).limit(1))[0];
  }

  /**
   *
   * @param id Genesis block ID/indep_hash
   */
  async insertGenesis(id: string) {
    try {
      // await this.connection.transaction((trx) => {
      //   this.connection('blocks')
      //     .transacting(trx)
      //     .insert({
      //       id: id,
      //       height: 0,
      //       mined_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      //       previous_block: '',
      //       txs: JSON.stringify(['']),
      //       extended: JSON.stringify({}),
      //     }).then(trx.commit);
      // });
      await this.connection
        .insert({
            id: id,
            height: 0,
            mined_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            previous_block: '',
            txs: JSON.stringify(['']),
            extended: JSON.stringify({}),
          })
          .into('blocks');
    } catch (error) {
      console.error({ error });
    }
  }
}
