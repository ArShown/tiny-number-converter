import { expect } from 'chai';
import number_format from '../source/index';

describe('number_format', () => {
  describe('整數', () => {
    it("最小位數為0 (123456.789, '0') => '123456'", () => {
      expect(number_format(123456.789, '0')).to.be.eql('123456');
    });
    it("最小位數為0，若輸出為零就不顯示 (0, '0') => ''", () => {
      expect(number_format(0, '0')).to.be.eql('');
    });
    it("不足位補零 (0, '1') => '0'", () => {
      expect(number_format(0, '1')).to.be.eql('0');
    });
    it("不足位補零 (123456.789, '3') => '123456'", () => {
      expect(number_format(123456.789, '3')).to.be.eql('123456');
    });
    it("不足位補零 (123456.789, '7') => '0123456'", () => {
      expect(number_format(123456.789, '7')).to.be.eql('0123456');
    });
    it("取後面三碼 (123456.789, '-3') => '123456'", () => {
      expect(number_format(123456.789, '-3')).to.be.eql('456');
    });
    it("空字串回傳空 (123456.789, '') => ''", () => {
      expect(number_format(123456.789, '')).to.be.eql('');
    });

    it("(-500, '-5c') => '-00'", () => {
      expect(number_format(-500, '-5c')).to.be.eql('500');
    });
    it("(-500, '-2c') => '-00'", () => {
      expect(number_format(-500, '-2')).to.be.eql('00');
    });

    it("(-500, '0c') => '-500'", () => {
      expect(number_format(-500, '0c')).to.be.eql('-500');
    });
    it("(-5000, '0c') => '-5,000'", () => {
      expect(number_format(-5000, '0c')).to.be.eql('-5,000');
    });
  });

  describe('小數', () => {
    it("(123456.789, '.0') => '.789'", () => {
      expect(number_format(123456.789, '.0')).to.be.eql('.789');
    });
    it("(123456.789, '.2') => '.78'", () => {
      expect(number_format(123456.789, '.2')).to.be.eql('.78');
    });
    it("(123456.789, '.4') => '.7890'", () => {
      expect(number_format(123456.789, '.4')).to.be.eql('.7890');
    });
    it("(123.456, '2.2') => '123.45'", () => {
      expect(number_format(123.456, '2.2')).to.be.eql('123.45');
    });
    it("(123.456, '4.4') => '0123.4560'", () => {
      expect(number_format(123.456, '4.4')).to.be.eql('0123.4560');
    });
    it("(123.456, '') => ''", () => {
      expect(number_format(123.456, '')).to.be.eql('');
    });
    it("(123.456, '.-4') => ''", () => {
      expect(number_format(123.456, '.-4')).to.be.eql('');
    });
    it("(123.456, '4.-4') => '0123'", () => {
      expect(number_format(123.456, '4.-4')).to.be.eql('0123');
    });
    it("(100, '.0') => ''", () => {
      expect(number_format(100, '.0')).to.be.eql('');
    });
    it("(100, '0.2') => ''", () => {
      expect(number_format(100, '0.2')).to.be.eql('100.00');
    });
  });

  describe('r : 四捨五入', () => {
    it("(456.78, '0.1r') => 456.8", () => {
      expect(number_format(456.78, '0.1r')).to.be.eql('456.8');
    });
    it("(123456.789, '0rc') => 123,457", () => {
      expect(number_format(123456.789, '0rc')).to.be.eql('123,457');
    });
    it("(-456.78, '0r') => -457", () => {
      expect(number_format(-456.78, '0r')).to.be.eql('-457');
    });
  });

  describe('c: 逗號', () => {
    it("(123456.789, '0c') => '123,456'", () => {
      expect(number_format(123456.789, '0c')).to.be.eql('123,456');
    });
    it("(123456.789, '7c') => '0,123,456'", () => {
      expect(number_format(123456.789, '7c')).to.be.eql('0,123,456');
    });
    it("(123456.789, '-4.2c') => '3,456.78'", () => {
      expect(number_format(123456.789, '-4.2c')).to.be.eql('3,456.78');
    });
    it("(123456.789, '.4c') => '.78'", () => {
      expect(number_format(123456.789, '.4c')).to.be.eql('.7890');
    });
    it("(-1000.789, '0c') => '-1,000'", () => {
      expect(number_format(-1000.789, '0c')).to.be.eql('-1,000');
    });
    it("(-123456.789, '-4cr') => '3,457'", () => {
      expect(number_format(-123456.789, '-4cr')).to.be.eql('3,457');
    });
  });

  describe('k: 千', () => {
    it("(123456.789, '0k') => '123'", () => {
      expect(number_format(123456.789, '0k')).to.be.eql('123');
    });
    it("(123456789.123, '0.2k') => '123456.78'", () => {
      expect(number_format(123456789.123, '0.2k')).to.be.eql('123456.78');
    });
    it("(123456789, '-4kc') => '3,456'", () => {
      expect(number_format(123456789, '-4kc')).to.be.eql('3,456');
    });
    it("(123456789, 'c-4k') => '3,456'", () => {
      expect(number_format(123456789, 'c-4k')).to.be.eql('3,456');
    });
    it("(123456789, '-4ck') => '3,456'", () => {
      expect(number_format(123456789, '-4ck')).to.be.eql('3,456');
    });
    it("(123456789, 'ck-4') => '3,456'", () => {
      expect(number_format(123456789, 'ck-4')).to.be.eql('3,456');
    });
    it("(123456789.123, '-3kr') => '457'", () => {
      expect(number_format(123456789.123, '-3kr')).to.be.eql('457');
    });
    it("(123456789.123, 'r-3k') => '457'", () => {
      expect(number_format(123456789.123, 'r-3k')).to.be.eql('457');
    });
    it("(123456.789, 'k') => ''", () => {
      expect(number_format(123456.789, 'k')).to.be.eql('');
    });
  });

  describe('m: 百萬', () => {
    it("(123456.789, '0m') => ''", () => {
      expect(number_format(123456.789, '0m')).to.be.eql('');
    });

    it("(1123456.789, '0m') => '1'", () => {
      expect(number_format(1123456.789, '0m')).to.be.eql('1');
    });

    it("(123456789, '0mc') => '1,234'", () => {
      expect(number_format(1234567890, '0mc')).to.be.eql('1,234');
    });

    it("(123456789, '0mcr') => '1,235'", () => {
      expect(number_format(1234567890, '0mcr')).to.be.eql('1,235');
    });

    it("(123456789, 'mc0r') => '1,235'", () => {
      expect(number_format(1234567890, 'mc0r')).to.be.eql('1,235');
    });

    it("(123456.789, '0.4m') => '0.1234'", () => {
      expect(number_format(123456.789, '0.4m')).to.be.eql('0.1234');
    });

    it("(1123456.789, '1.4m') => '0.1234'", () => {
      expect(number_format(1123456.789, '1.4m')).to.be.eql('1.1234');
    });

    it("(123, '0.8m') => '0.00012300'", () => {
      expect(number_format(123, '0.8m')).to.be.eql('0.00012300');
    });

    it("(123, '.8m') => '.00012300'", () => {
      expect(number_format(123, '.8m')).to.be.eql('.00012300');
    });
  });

  describe('b: 十億', () => {
    it("(123456.789, '0b') => ''", () => {
      expect(number_format(123456.789, '0b')).to.be.eql('');
    });

    it("(123456.789, '1b') => '0'", () => {
      expect(number_format(123456.789, '1b')).to.be.eql('0');
    });

    it("(123456000.789, '0b') => ''", () => {
      expect(number_format(123456000.789, '0b')).to.be.eql('');
    });

    it("(1123456000.789, '0b') => '1'", () => {
      expect(number_format(1123456000.789, '0b')).to.be.eql('1');
    });

    it("(1234567890000, '0bc') => '1,234'", () => {
      expect(number_format(1234567890000, '0bc')).to.be.eql('1,234');
    });

    it("(1234567890000, 'r0bc') => '1,235'", () => {
      expect(number_format(1234567890000, 'r0bc')).to.be.eql('1,235');
    });

    it("(123000, '0.8b') => '0.00012300'", () => {
      expect(number_format(123000, '0.8b')).to.be.eql('0.00012300');
    });
  });

  describe('g : 自動換算最大單位', () => {
    it("(123456.789, '0g') => '123K'", () => {
      expect(number_format(123456.789, '0g')).to.be.eql('123K');
    });
    it("(100, '0g') => '0K'", () => {
      expect(number_format(100, '0g')).to.be.eql('');
    });
    it("(123456.789, '0.0g') => '123.456789K'", () => {
      expect(number_format(123456.789, '0.0g')).to.be.eql('123.456789K');
    });
    it("(0.789, '0.0g') => '0.000789K'", () => {
      expect(number_format(0.789, '0.0g')).to.be.eql('0.000789K');
    });
    it("(123456.789, 'g') => ''", () => {
      expect(number_format(123456.789, 'g')).to.be.eql('');
    });
    it("(123456789.123, '2.3g') => '123.456M'", () => {
      expect(number_format(123456789.123, '2.3g')).to.be.eql('123.456M');
    });
    it("(123456789.123, '5.3gr') => '00123.457M'", () => {
      expect(number_format(123456789.123, '5.3gr')).to.be.eql('00123.457M');
    });
    it("(1234567890000.123, '0.3grc') => '1,234.568B'", () => {
      expect(number_format(1234567890000.123, '0.3grc')).to.be.eql(
        '1,234.568B'
      );
    });
  });

  describe('a : 換算最大之後的所有單位', () => {
    it("(123456789.123, 'a') => '123M 456K'", () => {
      expect(number_format(123456789.123, 'a')).to.be.eql('123M 456K');
    });
    it("(123000456789.123, 'a') => '123B 0M 456K'", () => {
      expect(number_format(123000456789.123, 'a')).to.be.eql('123B 0M 456K');
    });
    it("(100, 'a') => '0K'", () => {
      expect(number_format(100, 'a')).to.be.eql('0K');
    });
  });

  describe('[]: 字串', () => {
    it("(123456789.123, '[NTD: ]0k[$]') => 'NTD: 123456$'", () => {
      expect(number_format(123456789.123, '[NTD: ]0k[$]')).to.be.eql(
        'NTD: 123456$'
      );
    });
    it("(1123456.789, '1.4ckm[km]') => '1,123.4567km'", () => {
      expect(number_format(1123456.789, '1.4ckm[km]')).to.be.eql(
        '1,123.4567km'
      );
    });
    it("(123456.789, '-4.2c[(千)]') => '3,456.78(千)'", () => {
      expect(number_format(123456.789, '-4.2c[(千)]')).to.be.eql(
        '3,456.78(千)'
      );
    });
    it("不足位補零 (123456789, '[Amount: $]12c') => 'Amount: $000,123,456,789'", () => {
      expect(number_format(123456789, '[Amount: $]12c')).to.be.eql(
        'Amount: $000,123,456,789'
      );
    });
  });

  describe('(): 群組', () => {
    it("(1234567.89, '(0m)M & (0k)K') => '1M & 1234K'", () => {
      expect(number_format(1234567.89, '(0m)M & (0k)K')).to.be.eql(
        '1M & 1234K'
      );
    });
    it("(123456.789, '(1m)M,(0k)K') => '0M,123K'", () => {
      expect(number_format(123456.789, '(1m)M,(0k)K')).to.be.eql(
        '0M,123K'
      );
    });
    it("(1234567.89, '(1b)B,(-3m)M,(-3k)K,(-3.2)') => '1M,234K,567.89'", () => {
      expect(number_format(1234567.89, '(0b)B,(-3m)M,(-3k)K,(-3.2)')).to.be.eql(
        'B,1M,234K,567.89'
      );
    });
    it("(123456789.123, '(0mM)[k](0k)') => '123[k]123456'", () => {
      expect(number_format(123456789.123, '(0mM)[k](0k)')).to.be.eql(
        '123[k]123456'
      );
    });
    it("(1000, '[ABC](0k)') => '[ABC]1'", () => {
      expect(number_format(1000, '[ABC](0k)')).to.be.eql(
        '[ABC]1'
      );
    });
    it("(1000, 'ABC(0k)') => 'ABC1'", () => {
      expect(number_format(1000, 'ABC(0k)')).to.be.eql(
        'ABC1'
      );
    });
    it("多層的處理", () => {
      expect(number_format(1000, '(1k(1k))1k')).to.be.eql(
        '1k11k'
      );
      expect(number_format(1000, '(1k)(1k)(1k)')).to.be.eql(
        '111'
      );
      expect(number_format(1000, '1k(1k)1k')).to.be.eql(
        '1k11k'
      );
    });

  });

  describe('建構式方式', () => {
    let number;
    before(() => {
      number = new number_format(123456.789);
    });
    it('取得結果', () => {
      expect(number.value()).to.be.eql('123,456.79');
    });
    it('變更格式： 0.4', () => {
      expect(number.format('0.4')).to.be.eql('123456.7890');
    });
    it('變更格式： 4c.2', () => {
      expect(number.format('4c.2')).to.be.eql('123,456.78');
      expect(number.format('c4.2')).to.be.eql('123,456.78');
      expect(number.format('4.2c')).to.be.eql('123,456.78');
    });
    it('變更格式： 1k', () => {
      expect(number.format('1k')).to.be.eql('123');
    });
  });
});
