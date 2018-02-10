import { ConvertCharToPagePipe } from './convert-char-to-page.pipe';

describe('ConvertCharToPagePipe', () => {
  it('create an instance', () => {
    const pipe = new ConvertCharToPagePipe();
    expect(pipe).toBeTruthy();
  })

  it('should convert 1500 characters to 1 page', () => {
    const pipe = new ConvertCharToPagePipe();
    const pages = pipe.transform(1500);
    expect(pages).toEqual(1);
  })

  it('should convert 1501 characters to 1.5 page', () => {
    const pipe = new ConvertCharToPagePipe();
    const pages = pipe.transform(1501);
    expect(pages).toEqual(1.5);
  })

  it('should convert 750 characters to 0.5 page', () => {
    const pipe = new ConvertCharToPagePipe();
    const pages = pipe.transform(750);
    expect(pages).toEqual(0.5);
  })

  it('should convert 751 characters to 1 page', () => {
    const pipe = new ConvertCharToPagePipe();
    const pages = pipe.transform(751);
    expect(pages).toEqual(1);
  })
});
