import Layout from '../components/Layout'
import useSWR from 'swr'
import axios from 'axios'
import Comment from '../components/Comment'
import { COMMENT } from '../types/Types'

const axiosFetcher = async () => {
  const result = await axios.get<COMMENT[]>(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10'
  )
  return result.data
}

const CommentPage: React.FC = () => {
  const { data: comments, error } = useSWR('commentsFetch', axiosFetcher)
  // useSWR option
  // initialData 初期値
  // revalidateOnMount 画面リロード時（マウント時）に自動でデータ取得しに行く
  // initialDataが設定されている場合はデフォルトOFF　ONにする場合は明示的にtrue必要
  // initialDataが設定されていない場合はデフォルトON
  // refreshInterval ms毎にデータ取得しにいく　defaultは0でOFF
  // dedupingInterval リクエストの同時受付インターバル　デフォルトは2000ｍ秒で２秒間のうちに1000回リクエストがあっても最初の1回だけを受け付ける
  // testのときはdedupingIntervalを０にすることが推奨されている

  if (error) return <span>Error!</span>

  return (
    <Layout title="Comment">
      <p className="text-4xl m-10">comment page</p>
      <ul>
        {comments &&
          comments.map((comment) => <Comment key={comment.id} {...comment} />)}
      </ul>
    </Layout>
  )
}
export default CommentPage
