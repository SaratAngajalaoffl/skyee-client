/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	User = "user",
	Video = "video",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type UserRecord = {
	address: string
}

export type VideoRecord = {
	title: string
	description?: string
	price?: number
	asset_id: string
	playback_id: string
	playback_url: string
	uploader: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type UserResponse = UserRecord & BaseSystemFields
export type VideoResponse<Texpand = unknown> = VideoRecord & BaseSystemFields<Texpand>

export type CollectionRecords = {
	user: UserRecord
	video: VideoRecord
}