---
title: 이미지 업로드하기
subtitle: 이미지 업로드 프로세스
date: "2025-04-14T23:46:37.121Z"
signboard: true
shorts: true
tags:
  - JavaScript
  - Theory
thumbnail_image: "./upload-image.png"
---

## 시작

사용자의 PC에 있는 이미지를 어떻게 보여줘야할까요?
사용자가 가지고 있는 이미지를 PC에서 그대로 가져와 보여줄 수도 있고,
서버에 업로드한 뒤 가져올 수도 있을 것 같습니다.

두가지 방법의 장단점과 좀 더 효율적으로 업로드 할 수 있는 Presigned Url로 업로드하는 방법에 대해 정리해보겠습니다.

## 로컬 이미지 바로 보여주기

`1. 사용자의 PC에 있는 이미지를 가져오기`<br />

처음 이미지를 가져오는 시점에는 실제 파일에 대한 참조와 메타데이터를 가져옵니다.
아직 실제 파일데이터는 메모리에 로드되지 않았습니다.

```typescript
// 1. 파일 선택 시
const file = e.target.files[0]
console.log(file)
/* File 객체는 다음과 같은 메타데이터를 포함합니다:
{
  name: "image.jpg",
  size: 123456,
  type: "image/jpeg",
  lastModified: 1234567890,
  // 실제 파일 내용은 아직 메모리에 로드되지 않은 상태
}
*/
```

`2. Base64 형식으로 변환`

가져왔던 메타데이터를 FileReader를 사용해 Base64 형식으로 가져옵니다.
이 형식대로 변환시에는 실제 파일이 메모리에 로드됩니다.

```typescript
const reader = new FileReader()

// 로딩 진행 상태 확인 가능
reader.onprogress = event => {
  if (event.lengthComputable) {
    const progress = (event.loaded / event.total) * 100
    console.log(`Loading: ${progress}%`)
  }
}

reader.onload = () => {
  const base64 = reader.result as string
  // 이 시점에서 실제 파일 데이터가 메모리에 로드됨
  // base64 형식: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}

reader.readAsDataURL(file)
```

`3. 변환된 Base64 형태의 텍스트를 img태그를 통해 보여줌`

변환한 Base64 문자열은 실제 이미지 데이터를 텍스트로 인코딩한 결과물입니다.
이 텍스트는 브라우저가 디코딩해 이미지로 보여집니다.

```typescript
// img 태그로 표시 시
<img
  src={base64String}
  alt="Preview"
  onLoad={() => {
    // 이미지 로드 완료
    console.log("Image loaded")
  }}
  onError={() => {
    // 이미지 로드 실패
    console.log("Image load failed")
  }}
/>
```

## 서버에 업로드 후 보여주기

`1. 선택한 파일 업로드`

```typescript
const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  // FormData 생성 및 이미지 추가
  const formData = new FormData()
  formData.append("image", file)

  try {
    // 서버로 이미지 업로드
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    setImageUrl(data.imageUrl) // 업로드된 이미지 URL 저장
  } catch (error) {
    console.error("Upload failed:", error)
  }
}
```

전과 동일한 방식으로 파일을 가져오되 이번엔 FormData에 이미지 파일을 추가해야합니다.

파일 바이너리 데이터를 HTTP요청으로 전송해야하기때문입니다.
JSON형식으로는 바이너리 데이터를 직접 전송할 수 없고 FormData를 사용하면 여러파일을 한번에 전송하거나 다른데이터를 함께 전송할 수 있습니다.

`2. 서버로부터 받은 URL로 이미지 표시`

```typescript
<div>
  <input type="file" accept="image/*" onChange={handleImageUpload} />
  {imageUrl && (
    <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto" />
  )}
</div>
```

React를 기준으로 이렇게 이미지 표시를 할 수 있습니다.
서버에 업로드 되어있기때문에 별도로 이미지 url을 가져오는 API가 있다면,
소실될 걱정없이 이미지를 보여줄 수 있습니다.

### Pre-signed URL 이미지 업로드

좀 더 효율적인 방법도 있습니다.

서버를 거치지 않고 클라우드 스토리지에 파일을 직접 업로드하는 방법입니다.
만약에 AWS S3와 같이 클라우드 서비스를 적극적으로 활용하는 프로젝트라면,
이 방법이 이미지를 업로드하는 최적의 방식입니다.

이 방식은 기존에 서버에 직접 파일데이터를 업로드하는 것과 조금다릅니다.

`1. 클라이언트에서 서버에 업로드 URL 요청`<br/>
`2. 서버가 임시 URL을 생성해 반환`<br/>
`3. 반환받은 임시 URL에 직접 파일 업로드`<br/>
`4. 업로드 완료 후 파일의 최종 URL 사용`<br/>

물론 서버에 임시 URL을 요청하려면 파일정보가 필요합니다.
간단히 설명하자면, 사용자가 업로드할 파일을 미리 알려주는겁니다.
이렇게 파일정보를 서버에 미리 알려주고 받은 임시 URL은
처음에 내가 말한 파일정보의 규정대로만 파일을 업로드할 수 있게 제한합니다.

한마디로 어떤형식의 파일을 업로드할지 약속하는거죠

이 약속이 없다면 악의적으로 대용량 파일을 업로드해 스토리지를 낭비하거나
실행 파일(exe) 등 위험한 파일을 업로드할 수 있습니다. 또 서버에서 미리 제한해둔 규칙대로 파일을 업로드 할 수 있기 때문에
유지보수와 관리가 편리해집니다.

<br/>

```typescript
// Pre-singed URL에 업로드하는 예시
const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  try {
    // 1. Pre-signed URL 요청
    const response = await fetch("/api/get-upload-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    })

    const { uploadUrl, fileUrl } = await response.json()

    // 2. Pre-signed URL로 직접 파일 업로드
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    })

    // 3. 업로드된 이미지 URL 저장
    setImageUrl(fileUrl)
  } catch (error) {
    console.error("Upload failed:", error)
  }
}
```

## 결론

`로컬 이미지 바로 보여주기`

Base64 방식은 말그대로 로컬에있는 이미지를 그대로 가져와 보여주는것입니다.
사용자가 별도로 캐시할 수 없다면 새로고침시 사라지는 일시적인 데이터이며 가볍게 보여주는 미리보기용도에 적합합니다.

그러나 메모리를 사용하기때문에 대용량 이미지 또는 여러 이미지를 동시에
보여주게된다면 페이지 성능 저하로 이어질 수 있습니다.

`서버로부터 받은 URL로 이미지 표시`

서버에 업로드하는 방식은 영구적인 저장이 가능합니다.
사용자 PC의 메모리가 아닌 서버에 업로드된 이미지를 가져오기때문에
성능저하를 걱정하지 않아도 됩니다.

`Pre-signed URL 이미지 업로드`

그러나 업로드하는 API를 만들고 서버 리소스를 사용해야합니다.
상황에 따라 업로드 시간이 소요되며 비용과 별도의 관리가 필요합니다.

Pre-signed URL 방식은 클라우드 저장소를 사용한다는 가정하에
고도화된 서버 업로드라고 생각합니다.

서버 부하가 감소하고 대용량 파일이나 성능을 높이고 싶을때 적합합니다.
클라우드 서비스 의존성이 높고 초기 설정이 복잡하다는 단점외엔 없습니다.

`어떻게 사용할까요?`

서비스마다 UI/UX의 설계와 용도에 따라 다르겠지만, 미리보기는 Base64 방식을 사용하면서 저장해야하는 이미지라면 동시에 서버에 업로드하면됩니다.

사실 파일은 미리보기할 이유가 크게없습니다. 때문에 서버에 업로드할게 아니라면
사용자가 볼 일도 없으니 Base64로 변환하지도 UI로 보여줄 필요도 없죠.

좀 더 규모가 커진다면 썸네일 이미지를 별도로 만드는 경우도 있습니다.
오늘은 서비스에서 어떻게 이미지를 보여주고 업로드하는지 알아보았습니다.
