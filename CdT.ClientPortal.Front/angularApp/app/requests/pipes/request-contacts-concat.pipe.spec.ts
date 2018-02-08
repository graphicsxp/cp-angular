import { RequestContactsConcatPipe } from './request-contacts-concat.pipe';

describe('RequestContactsConcatPipe', () => {
  it('create an instance', () => {
    const pipe = new RequestContactsConcatPipe();
    expect(pipe).toBeTruthy();
  });
});
