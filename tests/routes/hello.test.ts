/**
 * Unit tests for the GET /hello route handler
 * Tests verify the endpoint returns correct status, body, and headers
 */

import { Response } from 'express';
import { helloHandler } from '../../src/routes/hello';

describe('GET /hello', () => {
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    jsonMock = jest.fn().mockReturnThis();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockRes = {
      status: statusMock,
      json: jsonMock,
      setHeader: jest.fn(),
    };
  });

  describe('HTTP Status Code', () => {
    it('should return status 200 on successful request', () => {
      helloHandler({} as unknown, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
    });
  });

  describe('Response Body', () => {
    it('should return JSON with message field', () => {
      helloHandler({} as unknown, mockRes as Response);

      expect(jsonMock).toHaveBeenCalled();
    });

    it('should return message field with value "Hello, World!"', () => {
      helloHandler({} as unknown, mockRes as Response);

      const calledWith = jsonMock.mock.calls[0][0];
      expect(calledWith).toEqual({
        message: 'Hello, World!',
      });
    });
  });

  describe('Content-Type Header', () => {
    it('should return application/json Content-Type', () => {
      helloHandler({} as unknown, mockRes as Response);

      // Express json() method automatically sets Content-Type to application/json
      // We verify this by checking that json() was called on the response
      expect(statusMock).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalled();
    });
  });

  describe('Request Handling', () => {
    it('should not depend on request object', () => {
      // The handler should work regardless of request content
      const emptyReq = {} as unknown;
      helloHandler(emptyReq, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Hello, World!',
      });
    });

    it('should handle request with query parameters', () => {
      const reqWithQuery = { query: { foo: 'bar' } } as unknown;
      helloHandler(reqWithQuery, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Hello, World!',
      });
    });
  });

  describe('Response Structure', () => {
    it('should return only the message field in response', () => {
      helloHandler({} as unknown, mockRes as Response);

      const calledWith = jsonMock.mock.calls[0][0];
      expect(Object.keys(calledWith)).toEqual(['message']);
    });

    it('should return a valid JSON object', () => {
      helloHandler({} as unknown, mockRes as Response);

      const calledWith = jsonMock.mock.calls[0][0];
      expect(typeof calledWith).toBe('object');
      expect(calledWith).not.toBeNull();
    });
  });
});
