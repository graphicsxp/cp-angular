import { ExtensionIconPipe } from './extension-icon.pipe';

describe('ExtensionIconPipe', () => {
  it('create an instance', () => {
    const pipe = new ExtensionIconPipe();
    expect(pipe).toBeTruthy();
  })

  it('should return default icon when null code', () => {
    const pipe = new ExtensionIconPipe();
    const pages = pipe.transform(null);
    expect(pages).toEqual('<i class="icon-cdt-default fa-2x"></i>');
  })

  it('should return default icon when empty code', () => {
    const pipe = new ExtensionIconPipe();
    const pages = pipe.transform('');
    expect(pages).toEqual('<i class="icon-cdt-default fa-2x"></i>');
  })

  it('should return default icon when empty code', () => {
    const pipe = new ExtensionIconPipe();
    const pages = pipe.transform('XX');
    expect(pages).toEqual('<i class="icon-cdt-default fa-2x"></i>');
  })

  it('should return word icon when word code', () => {
    const pipe = new ExtensionIconPipe();
    const pages = pipe.transform('WO');
    expect(pages).toEqual('<i class="icon-cdt-word fa-2x"></i>');
  })

});
