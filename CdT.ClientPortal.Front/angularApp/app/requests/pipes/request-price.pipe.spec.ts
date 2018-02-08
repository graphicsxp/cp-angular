import { RequestPricePipe } from './request-price.pipe';

describe('RequestPricePipe', () => {
  it('create an instance', () => {
    const pipe = new RequestPricePipe();
    expect(pipe).toBeTruthy();
  });
});
