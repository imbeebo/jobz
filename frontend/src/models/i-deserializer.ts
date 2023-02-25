export interface Deserializable<T> {
    deserialize: (data: T) => T;
}