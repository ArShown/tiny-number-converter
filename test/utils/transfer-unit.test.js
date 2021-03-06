import { expect } from 'chai';
import { getUnit, computeUnit } from '../../source/utils/transfer-unit';

describe('transfer-unit', () => {
  describe('#getUnit', () => {
    it('取得定義的單位', () => {
      expect(getUnit('123k')).to.be.equal('k');
      expect(getUnit('k123')).to.be.equal('k');
      expect(getUnit('lll')).to.be.null;
    });
    it('單位順序: a > g > k > m > b', () => {
      expect(getUnit('123k')).to.be.equal('k');
      expect(getUnit('mg149')).to.be.equal('g');
      expect(getUnit('100km')).to.be.equal('k');
      expect(getUnit('100bmk')).to.be.equal('k');
      expect(getUnit('100bmkg')).to.be.equal('g');
    });
    it('無定義單位', () => {
      expect(getUnit('lll')).to.be.null;
      expect(getUnit('123')).to.be.null;
      expect(getUnit('0.0')).to.be.null;
      expect(getUnit('0.0rc')).to.be.null;
    });
  });

  describe('#computeUnit', () => {
    it('計算: k : thousand 回傳 [integer, decimal]', () => {
      expect(computeUnit('k', '123456')).to.be.eql(['123', '456']);
      expect(computeUnit('k', '123456.789')).to.be.eql(['123', '456789']);
      expect(computeUnit('k', '123')).to.be.eql(['0', '123']);
      expect(computeUnit('k', '10')).to.be.eql(['0', '01']);
    });

    it('計算: m: million 回傳 [integer, decimal]', () => {
      expect(computeUnit('m', '123456')).to.be.eql(['0', '123456']);
      expect(computeUnit('m', '123456789')).to.be.eql(['123', '456789']);
      expect(computeUnit('m', '123')).to.be.eql(['0', '000123']);
    });

    it('計算: b : billion 回傳 [integer, decimal]', () => {
      expect(computeUnit('b', '123456000')).to.be.eql(['0', '123456']);
      expect(computeUnit('b', '123456789000')).to.be.eql(['123', '456789']);
      expect(computeUnit('b', '123000')).to.be.eql(['0', '000123']);
    });

    it('計算: g : 自動換算最大單位 [integer, decimal, unit]', () => {
      expect(computeUnit('g', '123456789000')).to.be.eql(['123', '456789', 'B']);
      expect(computeUnit('g', '123456000')).to.be.eql(['123', '456', 'M']);
      expect(computeUnit('g', '123000')).to.be.eql(['123', '', 'K']);
      expect(computeUnit('g', '100')).to.be.eql(['0', '1', 'K']);
      expect(computeUnit('g', '0.5')).to.be.eql(['0', '0005', 'K']);
    });
  });
});
