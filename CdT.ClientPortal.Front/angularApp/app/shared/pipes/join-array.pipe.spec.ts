import { JoinArrayPipe } from './join-array.pipe';
import { SourceMaterialLanguage, Language } from '../../model/breeze/entity-model';

describe('LanguageCodePipe', () => {

  let sourceLanguages = new Array<SourceMaterialLanguage>();

  beforeEach(() => {
    sourceLanguages = new Array<SourceMaterialLanguage>();
    const materialEnglish = new SourceMaterialLanguage();
    const english = new Language();
    english.code = 'EN';
    materialEnglish.language = english;

    const materialFrench = new SourceMaterialLanguage();
    const french = new Language();
    french.code = 'FR';
    materialFrench.language = french;

    sourceLanguages.push(...[materialEnglish, materialFrench])
  });

  it('create an instance', () => {
    const pipe = new JoinArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display "EN, FR"', () => {
    const pipe = new JoinArrayPipe();
    const languageCodes = pipe.transform(sourceLanguages, 'language.code');
    expect(languageCodes).toEqual('EN, FR');
  })

  it('should display "EN, FR"', () => {
    const pipe = new JoinArrayPipe();
    const languageCodes = pipe.transform(['EN', 'FR']);
    expect(languageCodes).toEqual('EN, FR');
  })
});
