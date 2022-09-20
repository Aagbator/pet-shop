// {
//   "id": 9223372036854776000,
//   "name": "cat",
//   "photoUrls": [],
//   "tags": [],
//   "status": "available"
// }

export interface IPetPayload {
  name: string;
  status: string;
};

export interface IPet {
  id: number;
  name: string;
  photoUrls: string[];
  tags: string[];
  status: string;
};

export interface IPetImageResponse {
  code: number;
  type: string;
  message: string;
}
