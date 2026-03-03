# nats 的使用模式

## MessageQueue 簡介

* [Message Queue 訊息隊列淺談](https://ithelp.ithome.com.tw/articles/10244884)

MQ相對於RPC通訊來說有以下優勢

1. 模組之間的耦合降低, 彼此不用在認識對方, 只要認識MQ使用它就好
2. 消息、事件、請求的順序性, 因為Queue的特性, 就是能保證先進先出
3. 異步通訊能力, RPC畢竟是個同步請求, MQ則只需要同步調用到, 資料丟給MQ, 服務有收到就好; 算是完成了非同步處理.
4. 緩衝能力, 消峰; 由於MQ的容量可以很大, 通常看記憶體給它的上限. 如果是用硬碟空間來存放Log的, 就幾乎無限容量了(加硬碟就好XD). 這樣子高峰期突來的請求流量, 就能被積壓起來在MQ內. 在後面的時間平滑地處理完成, 主要是保護DB, 讓DB不至於crash. 取用方根據自己的能力去MQ拉資料回來處理就好.

MQ消費方式:

1. Push: 當MQ收到新資料後, 主動調用Consumer的類似onMessage接口來通知處理. 這種消費方法, Consumer只能被動等待通知了.
2. Pull: Consumer輪詢調用MQ的接口來拿新資料. 相對的Client是主動權多很多.

## NATS 的使用模式

* [NATS & NATS Streaming介紹](https://ithelp.ithome.com.tw/articles/10245428)

NATS 主要支援 Pub/Sub 模式。

訊息的投遞保證, 有分成幾個 QOS 等級

QOS 0 -> At Most Once : NATS Server本身支援QOS0.
QOS 1 -> At Least Once : NATS Streaming 支援QOS1
QOS 2 -> Exactly Once

* [NATS Client基本使用與支持場景](https://ithelp.ithome.com.tw/articles/10246676)

1. Pub-Sub: 主要用在廣播場景上，每個Subscriber都會收到相同關注的Topic發布的訊息.
2. Queue Group: 會進行負載均衡, 隨機發送給同一組的任意Subscriber. 這種的好處可以搭配監控數據, 對Subscriber做自動伸縮. 提高系統的可用性.
3. Request-Reply:Request-Reply 發送應答, 可以支持1-1或者1-Many, 可以指定要幾個訂閱者收到.但通常是收到第一個Reply後, 其他就丟棄了, 減少等待時間. (這和 Queue Group 有點像)

![](https://i.imgur.com/9vKyjlV.png)

NATS 支持多種使用模式，包括發佈/訂閱（pub/sub）、單發送（single send）和請求/回應（request/response）。

在發佈/訂閱模式中，您可以訂閱一個主題，並在發佈者發佈消息時收到通知。在單發送模式中，您可以將消息發送到一個特定的主題，並且只有一個訂閱者可以收到消息。在請求/回應模式中，您可以將請求發送到一個主題，並在收到請求後回應。