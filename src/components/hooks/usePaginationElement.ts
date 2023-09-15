/**
 * 待研究：https://www.npmjs.com/package/@tanstack/vue-query
 */
import { computed } from 'vue'
import { usePagination } from 'vue-request'

interface PaginationElementOptions<R, P extends unknown[]> {
  onLoad: (params: P[0]) => Promise<R>
}

/**
 * ############################# 未完成的 #############################
 */
export function usePaginationElement<R, P extends unknown[] = any>(options: PaginationElementOptions<R, P>) {
  const queryResult = usePagination(
    async (params) => {
      return options.onLoad(params)
    },
    {
      defaultParams: [
        {
          pageNum: 1,
          pageSize: 10,
        },
      ],
      // manual: true,
      pagination: {
        currentKey: 'pageNum',
        pageSizeKey: 'pageSize',
        totalKey: 'total',
      },
      // 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
      // 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
      // debounceInterval: 52
      // 用changePagination就行了。
    }
  )

  const paginationAttrs = computed(() => {
    return {
      style: 'text-align: right',
      background: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSizes: [10, 50, 100],
      total: queryResult.total.value,
      currentPage: queryResult.current.value,
      pageSize: queryResult.pageSize.value,
    }
  })

  const paginationEvents = {
    'size-change': (val: number) => {
      console.debug('size-change', val)
      queryResult.changePagination(1, val)
    },
    'current-change': (val: number) => {
      console.debug('current-change', val)
      queryResult.changeCurrent(val)
    },
  }

  return {
    ...queryResult,
    paginationAttrs,
    paginationEvents,
  }
}
