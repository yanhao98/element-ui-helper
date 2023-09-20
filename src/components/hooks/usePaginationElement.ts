/**
 * https://www.attojs.com/guide/documentation/globalOptions.html
 */
import { computed } from 'vue'
import { usePagination, type PaginationOptions } from 'vue-request'
import { GLOBAL_CONFIG } from '../config'
import type { ElPagination } from 'element-ui/types/pagination'
import { merge, omit } from 'lodash'

export interface PaginationElementOptions<R, P extends unknown[]>
  extends Omit<PaginationOptions<R, P>, 'defaultParams'> {
  /**
   *
   */
  onFetch?: (params: P[0]) => Promise<R>
  defaultParams?: Record<string, unknown>
  elPaginationAttrs?: Omit<
    Partial<ElPagination> & {
      background?: boolean
    },
    'total' | 'currentPage' | 'pageSize'
  > &
    Record<string, unknown>
}

/**
 * vue-request 的话也有全局配置二次封装后为了 paginationAttrs 、 paginationEvents 的部分。
 */
export function usePaginationElement<R, P extends unknown[] = any>(options: PaginationElementOptions<R, P>) {
  const queryResult = usePagination(
    async (params) => {
      return options.onFetch?.(params)
    },
    {
      defaultParams: [
        {
          ...options.defaultParams,
          ...GLOBAL_CONFIG.hooks.usePaginationElement?.defaultParams,
        },
      ],
      ...(omit(merge(GLOBAL_CONFIG.hooks.usePaginationElement, options), [
        'onFetch',
        'defaultParams',
        'elPaginationAttrs',
      ]) as any),

      // 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
      // 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
      // debounceInterval: 52
      // 用changePagination就行了。
    }
  )

  const paginationAttrs = computed(() => {
    return {
      ...options.elPaginationAttrs,
      ...GLOBAL_CONFIG.hooks.usePaginationElement?.elPaginationAttrs,
      total: queryResult.total.value,
      currentPage: queryResult.current.value,
      pageSize: queryResult.pageSize.value,
    }
  })

  const paginationEvents = {
    'size-change': (val: number) => {
      // console.debug('size-change', val)
      queryResult.changePagination(1, val)
    },
    'current-change': (val: number) => {
      // console.debug('current-change', val)
      queryResult.changeCurrent(val)
    },
  }

  return {
    ...queryResult,
    mutate: queryResult.mutate as (data: R) => void,
    paginationAttrs,
    paginationEvents,
  }
}
